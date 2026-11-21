
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.IMGBB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: "ImgBB API key is missing" },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json(
      { success: false, message: "Please select an image" },
      { status: 400 }
    );
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json(
      { success: false, message: "Only image files are allowed" },
      { status: 400 }
    );
  }

  if (image.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { success: false, message: "Image must be smaller than 5MB" },
      { status: 400 }
    );
  }

  const uploadData = new FormData();
  uploadData.append("image", image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: uploadData,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    return NextResponse.json(
      { success: false, message: "Image upload failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    imageUrl: result.data.url,
  });
}
