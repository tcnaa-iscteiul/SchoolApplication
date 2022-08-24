const Config = {
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:3333/" :"https://school-application.vercel.app/",
    TIMEOUT_REQUEST: 5000,
    HEADER_REQUEST: {
        Accept: 'application/json'
    }
}
export default Config;

