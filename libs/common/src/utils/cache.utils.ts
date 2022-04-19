import { Validator } from 'class-validator'
import * as stringify from 'json-stable-stringify'
import { hash } from './hash.utils'

/**
 * @description: Utility functions to support caching operations
 * @notes:
 *  - Uses json-stable-stringify (instead of JSON.Stringify) for determanistic string generation - regardless of parameter ordering
 *  - Uses custom hash function as significantly faster than cryptogaphic hashes
 */
export class CachingUtils {
	private static validator = new Validator()

	public static makeCacheKeyFromId(entityId: string): string {
		// @ts-ignore
		this.validator.isMongoId(entityId)
		return this.makeCacheKeyFromProperty(entityId, 'id')
	}

	public static makeCacheKeyFromProperty(
		propertyName: string,
		propertyValue: string
	): string {
		// @ts-ignore
		this.validator.isNotEmpty(propertyValue)
		// @ts-ignore
		this.validator.isNotEmpty(propertyName)
		return `CacheKey-${propertyName}-${propertyValue}`
	}

	public static makeCacheKeyFromObject(object: object): string {
		return hash(stringify(object)).toString()
	}
}
