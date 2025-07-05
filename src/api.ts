export interface schema {
  '/birds': {
    /**
     * List birds
     * @description Get a list of all birds, optionally filtered by type
     */
    get: operations['listBirds']
  }
  '/birds/{birdId}': {
    parameters: Record<string, never>
    /**
     * Get a bird
     * @description Read an individual bird by ID
     */
    get: operations['birdById']
  }
  '/birds/{birdId}/sightings': {
    parameters: Record<string, never>
    /**
     * Sightings by bird ID
     * @description List all sightings for a bird
     */
    get: operations['sightingsByBirdId']
  }
  '/users': {
    parameters: Record<string, never>

    /**
     * Create user
     * @description Create a new user profile
     */
    post: operations['addUser']
  }
  '/users/{userId}': {
    parameters: Record<string, never>
    /**
     * Read user profile
     * @description Fetch a user's profile
     */
    get: operations['userById']
  }
  '/users/{userId}/sightings': {
    parameters: {
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
      }
    }
    /**
     * List sightings by user ID
     * @description List all bird sightings for a specific user
     */
    get: operations['sightingsByUserId']
    /**
     * Add sighting
     * @description Add a new bird sighting for a user
     */
    post: operations['addSighting']
  }
  '/users/{userId}/sightings/{sightingId}': {
    parameters: {
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: number
      }
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
    /**
     * Delete sighting
     * @description Delete a specific sighting by ID
     */
    delete: operations['deleteSighting']
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    User: {
      /** @example user1235 */
      id?: number
      /** @example Taylor Swift */
      name?: string
      favouriteBirds?: components['schemas']['Bird'][]
      /** @example taylorswift@example.com */
      email?: string
    }
    Sighting: {
      /** @description The sighting ID */
      id?: number
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
      colours?: string[]
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
  response: never
  pqarameters: {
    userId: number
    birdId: number
    sightingId: number
  }
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
        colour?: string
      }
    }
    response: {
      content: components['schemas']['Bird'][]
    }
  }
  birdById: {
    parameters: {
      path: {
        /**
         * @description bird ID
         * @example bird12345
         */
        birdId: number
      }
    }
    response: {
      content: components['schemas']['Bird']
    }
  }
  sightingsByBirdId: {
    parameters: {
      path: {
        /**
         * @description bird ID
         * @example bird12345
         */
        birdId: number
      }
    }
    response: {
      content: components['schemas']['Sighting']
    }
  }
  addUser: {
    parameters: Record<string, never>
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
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
      }
    }
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
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
      }
    }
    response: {
      content: components['schemas']['Sighting']
    }
  }
  addSighting: {
    parameters: {
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
      }
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
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: number
      }
    }
    response: {
      content: components['schemas']['Sighting']
    }
  }
  updateSighting: {
    parameters: {
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: number
      }
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
      path: {
        /**
         * @description User ID
         * @example user12345
         */
        userId: number
        /**
         * @description Sighting ID
         * @example sighting12345
         */
        sightingId: number
      }
    }
    response: {
      /** @description OK */
      content?: never
    }
  }
}
