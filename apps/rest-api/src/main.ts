import {Context, HttpRequest} from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';

import * as appInsights from 'applicationinsights';
import { createLocalApp } from './local-main';
import { createAzureApp } from './azure-main';

const isAzureFunction = process.env.IS_AZURE_FUNCTION && process.env.IS_AZURE_FUNCTION === 'true';

function azureFunctionHandler(context: Context, req: HttpRequest) {
  appInsights.setup().start();
  AzureHttpAdapter.handle(createAzureApp, context, req);
}

export default azureFunctionHandler;

if (!isAzureFunction) {
  createLocalApp().catch(err => {
    console.error(err);
  })
}
