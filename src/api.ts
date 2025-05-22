export interface schema {
  '/birds': {
    /**
     * List birds
     * @description Get a list of all birds, optionally filtered by type
     */
    get: operations['listBirds']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/birds/{birdId}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get a bird
     * @description Read an individual bird by ID
     */
    get: operations['birdById']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/birds/{birdId}/sightings': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Sightings by bird ID
     * @description List all sightings for a bird
     */
    get: operations['sightingsByBirdId']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /**
     * Create user
     * @description Create a new user profile
     */
    post: operations['addUser']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{userId}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Read user profile
     * @description Fetch a user's profile
     */
    get: operations['userById']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{userId}/sightings': {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
      }
      cookie?: never
    }
    /**
     * List sightings by user ID
     * @description List all bird sightings for a specific user
     */
    get: operations['sightingsByUserId']
    put?: never
    /**
     * Add sighting
     * @description Add a new bird sighting for a user
     */
    post: operations['addSighting']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{userId}/sightings/{sightingId}': {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: components['parameters']['sightingId']
      }
      cookie?: never
    }
    /**
     * Sighting by ID
     * @description Read a specific sighting by ID
     */
    get: operations['sightingByUserIdAndId']
    /**
     * Update sighting
     * @description Update a specific sighting by ID
     */
    put: operations['updateSighting']
    post?: never
    /**
     * Delete sighting
     * @description Delete a specific sighting by ID
     */
    delete: operations['deleteSighting']
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    User: {
      /** @example user1235 */
      id?: string
      /** @example Taylor Swift */
      name?: string
      favouriteBirds?: components['schemas']['Bird'][]
      /** @example taylorswift@example.com */
      email?: string
    }
    Sighting: {
      /** @description The sighting ID */
      id?: string
      /** @description The ID of the bird spotted */
      birdId?: number
      /** @description The date and time the bird was spotted */
      timestamp?: string
      /** @description The latitude of the sighting */
      lat?: number
      /** @description The longitude of the sighting */
      long?: number
      /** @description User notes about the sighting */
      notes?: string
    }
    Bird: {
      /**
       * Format: int64
       * @example 10
       */
      id?: number
      /** @example Avocet */
      name?: string
      /**
       * @description What kind of bird it is
       * @example wader
       */
      type?: string
      /**
       * @description Where the bird can be found
       * @example [
       *       "lakes",
       *       "wetlands"
       *     ]
       */
      habitats?: string[]
      colours?: components['schemas']['Colour'][]
      /** @description Any distinctive features to look out for */
      distinctiveFeatures?: string
      /** @description Wingspan in centimetres */
      wingspan?: number
      /** @description URL of image */
      image?: string
    }
    /**
     * @description The primary colour of the bird
     * @enum {string}
     */
    Colour:
      | 'black'
      | 'grey'
      | 'blue'
      | 'red'
      | 'green'
      | 'brown'
      | 'orange'
      | 'pink'
      | 'white'
      | 'yellow'
  }
  responses: never
  parameters: {
    /**
     * @description User ID
     * @example user12345
     */
    userId: string
    /**
     * @description bird ID
     * @example bird12345
     */
    birdId: number
    /**
     * @description Sighting ID
     * @example sighting12345
     */
    sightingId: string
  }
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export interface operations {
  listBirds: {
    parameters: {
      query?: {
        /**
         * @description Filter birds by type
         * @example waders
         */
        type?: string
        /**
         * @description List birds from a specific habitat
         * @example waders
         */
        habitat?: string
        /** @description Filter birds by colour */
        colour?: components['schemas']['Colour']
      }
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    response: {
      content: components['schemas']['Bird'][]
    }
  }
  birdById: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description bird ID
         * @example bird12345
         */
        birdId: components['parameters']['birdId']
      }
      cookie?: never
    }
    requestBody?: never
    response: {
      content: components['schemas']['Bird']
    }
  }
  sightingsByBirdId: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description bird ID
         * @example bird12345
         */
        birdId: components['parameters']['birdId']
      }
      cookie?: never
    }
    requestBody?: never
    response: {
      content: components['schemas']['Sighting']
    }
  }
  addUser: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: {
      content: {
        /** @description User's name */
        name?: string
        /** @description User's email address */
        email?: string
        /** @description User's favourite birds (bird IDs) */
        favouriteBird?: string[]
      }
    }
    response: {
      content: components['schemas']['User']
    }
  }
  userById: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
      }
      cookie?: never
    }
    requestBody?: never
    response: {
      content: components['schemas']['Sighting']
    }
  }
  sightingsByUserId: {
    parameters: {
      query?: {
        /** @description Bird ID to list sightings for, if you only want to show sightings of one bird */
        birdId?: number
        /** @description The date to list sightings from */
        from?: string
        /** @description The date to list sightings until (inclusive) */
        until?: string
      }
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
      }
      cookie?: never
    }
    requestBody?: never
    response: {
      content: components['schemas']['Sighting']
    }
  }
  addSighting: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
      }
      cookie?: never
    }
    requestBody: {
      content: {
        /** @description The ID of the bird spotted */
        birdId: number
        /** @description The date and time the bird was spotted */
        timestamp: string
        /** @description The latitude of the sighting */
        lat: number
        /** @description The longitude of the sighting */
        long: number
        /** @description User notes about the sighting */
        notes?: string
      }
    }
    response: {
      content: components['schemas']['Sighting']
    }
  }
  sightingByUserIdAndId: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: components['parameters']['sightingId']
      }
      cookie?: never
    }
    requestBody?: never
    response: {
      content: components['schemas']['Sighting']
    }
  }
  updateSighting: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: components['parameters']['sightingId']
      }
      cookie?: never
    }
    requestBody?: {
      content: {
        /** @description The ID of the bird spotted */
        birdId?: number
        /** @description The date and time the bird was spotted */
        timestamp?: string
        /** @description The latitude of the sighting */
        lat?: number
        /** @description The longitude of the sighting */
        long?: number
        /** @description User notes about the sighting */
        notes?: string
      }
    }
    response: {
      content: components['schemas']['Sighting']
    }
  }
  deleteSighting: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: components['parameters']['userId']
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: components['parameters']['sightingId']
      }
      cookie?: never
    }
    requestBody?: never
    response: {
      /** @description OK */
      content?: never
    }
  }
}
