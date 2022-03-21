export default class EncryptionModel {
  constructor(public passwordHash?: string, public saltKey?: string) {}
}
