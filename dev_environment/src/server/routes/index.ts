import { schema } from '@osd/config-schema';
import { IRouter } from '../../../../src/core/server';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

const INDEX_PATTERN = 'wazuh-test';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/custom_plugin/example',
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );

  // Endpoint para leer los elementos TO-DO.

  router.get(
    {
      path: '/api/custom_plugin/todo',
      validate: false,
    },
    async (context, request, response) => {
      try {
        const existsIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: INDEX_PATTERN
        });
        console.log(existsIndex.body);

        if (!existsIndex.body) {
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: INDEX_PATTERN,
          });
        }
      } catch (errExists) {
        console.log(errExists);
      }
      const responseItems = await context.core.opensearch.client.asCurrentUser.search({
        index: INDEX_PATTERN
      });
      return response.ok({
        body:{
          todos:responseItems.body.hits.hits
        }
      })
    }
  );

  // Endpoint para crear nuevos elementos TO-DO

  router.post(
    {
      path: '/api/custom_plugin/newtodo',
      validate: {
        body: schema.object({
          title: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      try {
        const { title } = request.body;
  
        // Generar un ID único
        const id = uuidv4();
  
        // Crear el objeto TODO con el ID generado
        const todoSource = {
          id,
          title,
          isCompleted: false
        };
  
        // Guardar el TODO en la base de datos
        const createResponse = await context.core.opensearch.client.asCurrentUser.index({
          id:id,
          refresh: true,
          index: INDEX_PATTERN,
          body: todoSource
        });
  
        if (createResponse.statusCode === 201) {
          return response.ok({
            body: {
              message: 'New TODO created successfully!',
              newTodo: todoSource,
            },
          });
        } else {
          throw new Error('An error occurred while creating a new TODO.');
        }
      } catch (error) {
        console.error(error);
        return response.internalError({
          body: {
            message: 'An error occurred while creating a new TODO.',
          },
        });
      }
    }
  );
  
  

  // Endpoint para establecer los elementos TO-DO como completados

  router.put(
    {
      path: '/api/custom_plugin/todo/{id}/complete',
      validate: {
        params: schema.object({
          id: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      try {
        const { id } = request.params;
  
        // Verificar si el TODO existe en la base de datos
        const todoResponse = await context.core.opensearch.client.asCurrentUser.get({
          index: INDEX_PATTERN,
          id: id,
        });
  
        if (!todoResponse.body.found) {
          return response.notFound({
            body: {
              message: 'No TODO was found with the specified ID.',
            },
          });
        }
  
        // Actualizar el estado del TODO como completado
        const updateResponse = await context.core.opensearch.client.asCurrentUser.update({
          refresh: true,
          index: INDEX_PATTERN,
          id: id,
          body: {
            doc: {
              isCompleted: true,
            },
          },
        });
  
        if (updateResponse.statusCode === 200) {
          return response.ok({
            body: {
              message: 'TODO marked as completed successfully!',
            },
          });
        } else {
          throw new Error('An error occurred while marking the TODO as completed.');
        }
      } catch (error) {
        console.error(error);
        return response.internalError({
          body: {
            message: 'An error occurred while marking the TODO as completed.',
          },
        });
      }
    }
  );
  

  // Endpoint para eliminar TODOs

  router.delete(
    {
      path: '/api/custom_plugin/todo/{id}',
      validate: {
        params: schema.object({
          id: schema.string(),
        }),
      },
    },
    
    async (context, request, response) => {
      console.log("hola")
      try {
        const { id } = request.params;

        const deleteResponse = await context.core.opensearch.client.asCurrentUser.delete({
          refresh:true,
          index: INDEX_PATTERN,
          id: id,
        });
        
        if (deleteResponse.statusCode === 200) {
          return response.ok({
            body: {
              message: 'TODO deleted successfully!',
            },
          });
  
        } else if (deleteResponse.statusCode === 404) {
          return response.notFound({
            body: {
              message: 'No TODO was found with the specified ID.',
            },
          });
        } else {
          throw new Error('An error occurred while deleting the TODO.');
        }
      } catch (error) {
        console.error(error);
        return response.internalError({
          body: {
            message: 'An error occurred while deleting the TODO.',
          },
        });
      }
    }
  );

  //Endpoint para editar TODOS
  router.put(
    {
      path: '/api/custom_plugin/todo/{id}',
      validate: {
        params: schema.object({
          id: schema.string(),
        }),
        body: schema.object({
          title: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      try {
        const { id } = request.params;
        const { title } = request.body;
  
        const updateResponse = await context.core.opensearch.client.asCurrentUser.update({
          refresh:true,
          index: INDEX_PATTERN,
          id: id,
          body: {
            doc: {
              title: title,
            },
          },
        });
  
        return response.ok({
          body: {
            message: 'TODO updated successfully!',
            updatedTodo: updateResponse.body,
          },
        });
      } catch (error) {
        console.error(error);
        return response.internalError({
          body: {
            message: 'An error occurred while updating the TODO.',
          },
        });
      }
    }
  );
  
}


  
  

