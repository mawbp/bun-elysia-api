import prisma from "../../prisma/client";

export async function getPosts(){
  try {
    const posts = await prisma.post.findMany({orderBy: {id: 'desc'}});

    return {
      success: true,
      message: 'List Data Postingan',
      data: posts
    };
  } catch(e: unknown){
    console.error(`Error getting post: ${e}`);
  }
}

export async function createPost(options: {title: string, content: string}){
  try {
    const {title, content} = options;
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content
      }
    });

    return {
      success: true,
      message: 'Postingan berhasil ditambahkan',
      data: post
    }
  } catch(e: unknown){
    console.error(`Error creating data: ${e}`);
  }
}

export async function getPostById(id: string){
  try{
    const postId = parseInt(id);
    const post = await prisma.post.findUnique({
      where: {id: postId},
    });

    if(!post){
      return {
        success: true,
        message: 'Detail data postingan tidak ditemukan',
        data: null
      }
    }

    return {
      success: true,
      message: `Detail data postingan: ${id}`,
      data: post
    }
  } catch(e: unknown){
    console.error(`Error getting data ${id}: ${e}`);
  }
}

export async function updatePost(id: string, options: {title?: string, content?: string}){
  try{
    const postId = parseInt(id);
    const {title, content} = options;

    const post = await prisma.post.update({
      where: {id: postId},
      data: {
        ...(title ? {title} : {}),
        ...(content ? {content}: {}),
      },
    });

    return {
      success: true,
      message: 'Postingan berhasil diupdate',
      data: post
    }
  } catch(e){
    console.error(`Error update data ${id}: {e}`);
    
  }
}

export async function deletePost(id: string){
  try{
    const postId = parseInt(id);
    await prisma.post.delete({
      where: {id: postId}
    });

    return {
      success: true,
      message: 'Postingan berhasil dihapus'
    }
  } catch(e: unknown){
    console.error(`Error deleting post: ${e}`);
    
  }
}