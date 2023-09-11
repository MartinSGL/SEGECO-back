import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  //function to catch errors and return answers in all try-catch services functions
  handleError(error: any) {
    // error for violation to unique rule in entity
    if (error.code === 11000) {
      throw new BadRequestException(
        `Duplicate ${
          Object.keys(error.keyValue)[Object.keys(error.keyValue).length - 1]
        } : ${
          error.keyValue[
            Object.keys(error.keyValue)[Object.keys(error.keyValue).length - 1]
          ]
        }`,
      );
    }
    // error for any BadRequestException(status 400)
    // most of them are validations
    if (error.response.statusCode === 400) {
      throw new BadRequestException(error.message);
    }

    // any other error once if statements didn't caught the error
    throw new InternalServerErrorException('Server Error' + error);
  }
}
