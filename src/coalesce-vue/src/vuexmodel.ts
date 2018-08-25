import vuex from 'vuex';

import * as $metadata from './metadata'
import { Model } from './model';
import { ClassType } from './metadata';


class ModelStore<TDomain extends $metadata.Domain> {

  models: {
    [typeName in keyof TDomain["types"]]: { 
      [primaryKey in string | number ]: Model<TDomain["types"][typeName]> 
    }
  }

  constructor(
    private domain: $metadata.Domain
  ) {
    const models: any = {}
    for (const typeName in domain.types) {
      models[typeName] = {}
    }
    this.models = models;
  }
}