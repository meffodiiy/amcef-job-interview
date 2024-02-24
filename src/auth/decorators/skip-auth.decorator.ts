import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_METADATA_KEY = 'isPublic'
export const SkipAuth = () => SetMetadata(IS_PUBLIC_METADATA_KEY, true)
