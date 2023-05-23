import autoBind from 'auto-bind'
import nodemailer from 'nodemailer'
import { transporterInstance } from '../utilities/mail'

export default abstract class BaseService {
  protected mailService: nodemailer.Transporter

  constructor() {
    this.mailService = transporterInstance()

    autoBind(this)
  }
}
