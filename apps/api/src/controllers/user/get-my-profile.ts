import { Request, Response } from 'express'

export const getMyProfile = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Successfully fetched profile',
    data: { ...req.user, password: undefined }
  })
}
