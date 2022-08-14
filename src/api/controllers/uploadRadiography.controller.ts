import { Request, Response } from 'express';

export function uploadRadiography(
  req: Request,
  res: Response
): Response<any, Record<string, any>> {
  console.log(req);
  if (req.file) {
    return res.json({
      response: req.file
    });
  }

  res.status(409);

  return res.json({
    response: `Não é um tipo de arquivo válido`
  });
}
