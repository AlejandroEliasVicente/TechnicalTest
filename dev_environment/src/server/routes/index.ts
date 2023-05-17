import { schema } from '@osd/config-schema';
import { IRouter } from '../../../../src/core/server';
import { v4 as uuidv4 } from 'uuid';

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
        const responseItems = await context.core.opensearch.client.asCurrentUser.search({
          index: INDEX_PATTERN,
        });
        return response.ok({
          body: {
            todoList: responseItems.body.hits.hits.map((hit) => hit._source),
          },
        });
      } catch (error) {
        console.error(error);
        return response.internalError({
          body: {
            message: 'An error occurred while retrieving TODOs.',
          },
        });
      }
    }
  );

  // Endpoint para crear nuevos elementos TO-DO

  router.post(
    {
      path: '/api/custom_plugin/todo',
      validate: {
        body: schema.object({
          title: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      try {
        const newTodo = {
          id: uuidv4(), // Generar un ID único usando la biblioteca uuid
          title: request.body.title,
          isCompleted: false,
        };
  
        const createResponse = await context.core.opensearch.client.asCurrentUser.create({
          index: INDEX_PATTERN,
          id: newTodo.id, // Proporcionar el ID único en la solicitud de creación
          body: newTodo,
        });
  
        return response.ok({
          body: {
            message: 'New TODO created successfully!',
            newTodo: createResponse.body,
          },
        });
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
      path: '/api/custom_plugin/todo/completed',
      validate: {
        body: schema.object({
          ids: schema.arrayOf(schema.string()),
        }),
      },
    },
    async (context, request, response) => {
      try {
        const { ids } = request.body;

        const updateResponse = await context.core.opensearch.client.asCurrentUser.updateByQuery({
          index: INDEX_PATTERN,
          body: {
            script: {
              source: 'ctx._source.isCompleted = true',
            },
            query: {
              terms: {
                _id: ids,
              },
            },
          },
        });

        return response.ok({
          body: {
            message: 'TODOs updated successfully!',
            updatedTodos: updateResponse.body,
          },
        });
      } catch (error) {
        console.error(error);
        return response.internalError({
          body: {
            message: 'An error occurred while updating TODOs.',
          },
        });
      }
    }
  );

  // Endpoint para eliminar TODOs

  router.delete(
    {
      path: '/api/custom_plugin/todo/:id',
      validate: {
        params: schema.object({
          id: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      try {
        const { id } = request.params;

        const deleteResponse = await context.core.opensearch.client.asCurrentUser.delete({
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
}


  
  

