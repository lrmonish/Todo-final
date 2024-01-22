declare global {
  interface Window extends WindowOrWorkerGlobalScope {
    setTimeout: typeof setTimeout;
  }
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
