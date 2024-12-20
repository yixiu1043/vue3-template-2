import { get, post } from '@/apis/http'

export const siteMaintenance = post('/siteMaintenance/[q]', { data: { p: 1 }, silent: true })
