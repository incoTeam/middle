// // src/setupProxy.js
// import {createProxyMiddleware} from 'http-proxy-middleware';
//
// export default function (app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'https://apis.data.go.kr',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/api': '', // '/api'를 빈 문자열로 변경하여 API 서버에 요청 전송
//             },
//         })
//     );
// }
