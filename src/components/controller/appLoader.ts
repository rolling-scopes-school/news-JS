import Loader from './loader';

class AppLoader extends Loader {
    // getResp(arg0: { endpoint: string }, callback: (data: import('../../types/interfaces').ISourceRespons) => any) {
    //     throw new Error('Method not implemented.');
    // }
    constructor() {
        super(process.env.API_URL as string, {
            apiKey: process.env.API_KEY as string,
        });
    }
}   

export default AppLoader;
