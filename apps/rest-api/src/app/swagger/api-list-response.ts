import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ListResult } from '@soccer-utilities/core';

export const ApiListResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListResult) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }
              }
            }
          }
        ]
      }
    })
  );
};
