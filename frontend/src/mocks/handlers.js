//const baseURL = '/api'
//
//export const handlers = [
//rest.get(`${baseURL}dj-rest-auth/user/`, (rew,res,ctx) => {
//    return res(
//        ctx.json({
//            "id": 4,
//            "owner": "Andreas",
//            "created_at": "20 Dec 2023",
//            "updated_at": "31 Dec 2023",
//            "name": "Andreas",
//            "content": "",
//            "image": "https://res.cloudinary.com/db6t1xmmn/image/upload/v1/media/images/Cowboy_andy_tea7st",
//            "is_owner": false,
//            "following_id": null,
//            "posts_count": 2,
//            "followers_count": 0,
//            "following_count": 0,
//            "email": "hamacher.design@googlemail.com"
//            })
//    );
//}),
//rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
//    return res(
//        ctx.status(200)
//    ),
//}),
//];