// src/app/api/tags/route.js
import { NextResponse } from 'next/server'
import { getAllTags } from '@/lib/tags'

function getCurrentUTCDateTime() {
    return new Date().toISOString().replace('T', ' ').slice(0, 19)
}

export async function GET() {
    try {
        const tags = await getAllTags('posts')
        return NextResponse.json({
            success: true,
            timestamp: getCurrentUTCDateTime(),
            userLogin: 'mrofisr',
            data: tags
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            timestamp: getCurrentUTCDateTime(),
            userLogin: 'mrofisr',
            error: error.message
        }, { status: 500 })
    }
}