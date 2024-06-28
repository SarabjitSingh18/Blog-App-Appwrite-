import conf from '../conf/conf'

//import essentials from appwrite
import { Client, ID, } from "appwrite";
import { Databases, Storage, Query } from 'appwrite';

export class Service {

    client = new Client()
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                })


        }
        catch (error) {
            console.log("Appwrite Service:: error ::createPost ", error)

        }

    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status

                })

        }
        catch (error) {
            console.log("Appwrite Service:: error ::updatePost ", error)

        }

    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service:: error ::deletePost ", error)
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )


        } catch (error) {
            console.log("Appwrite Service:: error ::getPost ", error)
            return false

        }

    }
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,//we can also write these queries directly here or we can just provide reference like this
                queries//this queries is just a variable and the actual syntax starts at ["key","value"]

            )
        } catch (error) {
            console.log("Appwrite Service:: error ::getPosts ", error)

        }


    }

    //file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("Appwrite Service:: error ::uploadFile ", error)
            return false

        }

    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }

        catch (error) {
            console.log("Appwrite Service:: error ::createPost ", error)

        }
    }
    getFilePreview(fileId) {
       return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default service