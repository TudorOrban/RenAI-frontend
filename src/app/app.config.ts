import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideHighlightOptions({
          fullLibraryLoader: () => import("highlight.js"),
          lineNumbersOptions: {
            startFrom: 0,
            singleLine: false
          }
        })
    ],
};
