import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

class FileService {
    async upload(file) {
        const fileName = uuid() + '.jpg';

        // Get the directory path of the current module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const targetPath = join(__dirname, '..', 'static', fileName);

        await file.mv(targetPath);
        return fileName;
    }
}

export default new FileService();