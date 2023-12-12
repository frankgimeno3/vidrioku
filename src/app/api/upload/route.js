

import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';
           
 
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    api_secret:  process.env.NEXT_PUBLIC_API_SECRET,
})
 

export async function POST(request) {
 
    
    const data = await request.formData()
    const image = data.get("image")

    if (!image) {
        return NextResponse.json("no se ha subido ninguna imagen", {
            status: 400
        })
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer)

    const response = await cloudinary.uploader.upload(filePath, {folder})
    console.log(response)

    return NextResponse.json("imagen subida")
}
