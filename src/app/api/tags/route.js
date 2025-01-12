import { getAllTags } from '@/lib/tags'

export async function GET(request) {
    try {
        const tags = await getAllTags('posts')
        return Response.json(tags)
    } catch (error) {
        return Response.json({ error: 'Failed to fetch tags' }, { status: 500 })
    }
}