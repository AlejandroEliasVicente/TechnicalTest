import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface CustomPluginPluginSetup {
  getGreeting: () => string;
}

export interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
  }


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
