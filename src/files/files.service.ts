import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import axios from 'axios';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async findOne(id: string) {
    try {
      const resp = await axios.get(`http://segeco-images:3001/images/${id}`, {
        responseType: 'arraybuffer', // Make sure to request the response as an array buffer
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 404) {
        return {
          error: true,
          message: error.response.data.message,
        };
      }
    }
  }

  async removeOne(id: string) {
    try {
      const resp = await axios.delete(`http://segeco-images:3001/images/${id}`);
      return resp.data;
    } catch (error) {
      if (error.response.status === 404) {
        return {
          error: true,
          message: error.response.data.message,
        };
      }
    }
  }
}
