import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import * as _ from "lodash";


import BaseController from "./base.controller";


export default class ConverterController extends BaseController {
  // check user is exists
  // static async isUserExists(id: any) {
  //   try {
  //     const query = `SELECT id FROM users WHERE id = ? ALLOW FILTERING`;
  //     const params = [id];
  //     const result = await CQL.executeQuery(query, params);
  //     if (result && result.rows && result.rows.length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // }

  // findAll = async (req: Request, res: Response) => {
  //   try {
  //     const params = req.body;
  //     // sort: 'first_name:desc',
  //     console.log("'" +  params.page.sortBy + ':' + params.page.sort + "'");

  //     const queryCount = {
  //       index: "csv2jsondb.users",
  //       type: "users",
  //       body: {
  //         query: {
  //           query_string: {
  //             query: "*" + params.page.filter + "*",
  //             fields: ["first_name", "last_name", "designation", "csv2json_name"]
  //           }
  //         },
  //         _source: ["id", "first_name", "last_name", "designation", "csv2json_name", "mobile", "is_active", "is_approved"]
  //       }
  //     };
  //     const resultCount = await EQL.executeSearch(queryCount);
  //     const totalCount = resultCount.hits.total;
      
  //     const query = {
  //       index: "csv2jsondb.users",
  //       type: "users",
  //       size: params.page.itemPerPage,
  //       from: (params.page.currentPage - 1) * params.page.itemPerPage,
  //       body: {
  //         query: {
  //           query_string: {
  //             query: "*" + params.page.filter + "*",
  //             fields: ["first_name", "last_name", "designation", "csv2json_name"]
  //           }
  //         },
  //         _source: ["id", "first_name", "last_name", "designation", "csv2json_name", "mobile", "is_active", "is_approved"]
  //       }
  //     };
  //     const result = await EQL.executeSearch(query);
  //     const data = {
  //       collection: result.hits.hits,
  //       totalItem: totalCount
  //     };
  //     res.json({ status: true, data, message: "Get Data Successfully." });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // };

  // // Find By Id
  async findById(req: Request, res: Response) {
    try {
      const query = "SELECT * FROM users WHERE id = ? ALLOW FILTERING";    

      if (query.length > 0) {
        res.json({ status: true, data: query });
      } else {
        res.json({ status: false, message: "User not found" });
      }
    } catch (error) {
      res.json({ status: false, message: error });
    }
  }

  // async findApprovedUserById(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query =
  //       "SELECT * FROM users WHERE approved_by = ? AND is_approved = ? ALLOW FILTERING";
  //     const values = [params.id, true];
  //     const result = await CQL.executeQuery(query, values);
  //     if (result && result.rows) {
  //       res.json({ status: true, data: result.rows });
  //     } else {
  //       res.json({ status: false, message: "User not found" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async findUnapprovedUserById(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query =
  //       "SELECT * FROM users WHERE approved_by = ? AND is_approved = ? ALLOW FILTERING";
  //     const values = [params.id, false];
  //     const result = await CQL.executeQuery(query, values);
  //     if (result && result.rows) {
  //       res.json({ status: true, data: result.rows });
  //     } else {
  //       res.json({ status: false, message: "User not found" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async findApprovedByUsers(req: Request, res: Response) {
  //   const params = req.body;
  //   let values = [];
  //   let query = "";
  //   let roleLevel = 0;
  //   let qOpt = "<";

  //   if (params.role_level === 8) {
  //     roleLevel = 6;
  //     qOpt = "=";
  //   } else {
  //     roleLevel = params.role_level;
  //   }

  //   if (params.location === "state") {
  //     query = `SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE state_id = ? AND role_level ${qOpt} ? ALLOW FILTERING;`;
  //     values = [params.id, roleLevel];
  //   } else if (params.location === "district") {
  //     query = `SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE district_id = ? AND role_level ${qOpt} ? ALLOW FILTERING;`;
  //     values = [params.id, roleLevel];
  //   } else if (params.location === "taluk") {
  //     query = `SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE taluk_id = ? AND role_level ${qOpt} ? ALLOW FILTERING;`;
  //     values = [params.id, roleLevel];
  //   } else if (params.location === "csv2json") {
  //     query = `SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE csv2json_id = ? AND role_level ${qOpt} ? ALLOW FILTERING;`;
  //     values = [params.id, roleLevel];
  //   }

  //   try {
  //     const result = await CQL.executeQuery(query, values);
  //     if (result && result.rows) {
  //       res.json({ status: true, data: result.rows });
  //     } else {
  //       res.json({ status: false, message: "User not found" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async findUserByLocation(req: Request, res: Response) {
  //   // {id, location, role_level}

  //   const params = req.body;
  //   let values = [];
  //   let query = "";
  //   let roleLevel = 0;

  //   if (params.role_level > 1) {
  //     roleLevel = params.role_level - 1;
  //   } else {
  //     roleLevel = params.role_level;
  //   }

  //   if (params.location === "state") {
  //     query = `SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE state_id = ? AND role_level = ? ALLOW FILTERING;`;
  //     values = [params.id, roleLevel];
  //   } else if (params.location === "district") {
  //     query = `SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE district_id = ? AND role_level = ? ALLOW FILTERING;`;
  //     values = [params.id, roleLevel];
  //   } else if (params.location === "taluk") {
  //     query =
  //       "SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE taluk_id = ? AND role_level = ? ALLOW FILTERING;";
  //     values = [params.id, roleLevel];
  //   } else if (params.location === "csv2json") {
  //     query =
  //       "SELECT id, first_name, last_name, district_name, taluk_name, csv2json_name, designation FROM users WHERE csv2json_id = ? AND role_level = ? ALLOW FILTERING;";
  //     values = [params.id, roleLevel];
  //   }

  //   try {
  //     const result = await CQL.executeQuery(query, values);
  //     if (result && result.rows) {
  //       res.json({ status: true, data: result.rows });
  //     } else {
  //       res.json({ status: false, message: "User not found" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async create(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const isUserExists = await UserController.isUserExists(params.id);
  //     if (isUserExists) {
  //       res.json({ status: false, message: "User already exists" });
  //     }
  //     if (!isUserExists) {
  //       const randomPassword = Nx.utils.getRandamPassword();
  //       let eModel = new EncryptionModel();
  //       eModel = Nx.encryption.encrypt(randomPassword);
  //       const query = `
  //         INSERT INTO users (
  //           id, parent_id, role_id, role_name, first_name, last_name, designation,
  //           password_hash, salt_key, email, mobile, gender, birth_date, 
  //           father_name, mother_name, state_id, state_name, district_id, district_name, 
  //           taluk_id, taluk_name, csv2json_id, csv2json_name, role_level, approved_by,
  //           is_active, is_approved, is_email_verified, is_mobile_verified, created_by, created_at
  //         )
  //         VALUES(
  //           ?, ?, ?, ?, ?, ?, ?,
  //           ?, ?, ?, ?, ?, ?, 
  //           ?, ?, ?, ?, ?, ?, 
  //           ?, ?, ?, ?, ?, ?,
  //           ?, ?, ?, ?, ?, dateof(now())
  //         )
  //       `;
  //       const values = [
  //         +params.id,
  //         params.parent_id,
  //         params.role_id,
  //         params.role_name,
  //         params.first_name,
  //         params.last_name,
  //         params.designation,
  //         eModel.passwordHash,
  //         eModel.saltKey,
  //         params.email,
  //         params.mobile,
  //         params.gender || "",
  //         params.birth_date,
  //         "Father_name",
  //         "Mother_name",
  //         params.state_id,
  //         params.state_name,
  //         params.district_id,
  //         params.district_name,
  //         params.taluk_id,
  //         params.taluk_name,
  //         params.csv2json_id,
  //         params.csv2json_name,
  //         params.role_level,
  //         params.approved_by,
  //         params.is_active,
  //         false,
  //         false,
  //         false,
  //         params.parent_id
  //       ];

  //       const result = await CQL.executeQuery(query, values);

  //       const mailMsg = {
  //         to: params.email,
  //         subject: "Account creation confirmation",
  //         message: `
  //           Hi, ${params.first_name} ${params.last_name} \n
  //           Welcome to admin portal, Your account has been created successfully. \n
  //           Your account details is\n 
  //           Username : "${params.id}" and Password : "${randomPassword}", 
  //           You have to wait for confirm your account by senior staff member.
  //           `
  //       };

  //       Nx.mail.sendMail(mailMsg.to, mailMsg.subject, mailMsg.message, false);

  //       const smsMsg = `
  //         Welcome to admin portal, Your account has been created successfully.
  //         Check you registered Email for login details.
  //       `;
  //       Nx.sms.sendSms(params.mobile, smsMsg);

  //       if (params.approved_by !== null && params.approved_by !== "") {
  //         const qFindApproval =
  //           "SELECT * FROM users WHERE id = ? ALLOW FILTERING";
  //         const vals = [params.approved_by];
  //         const resultApproval = await CQL.executeQuery(qFindApproval, vals);
  //         if (resultApproval && resultApproval.rows && resultApproval.rows[0]) {
  //           const _appravalUser = resultApproval.rows[0];
  //           const appMailMsg = {
  //             to: _appravalUser.email,
  //             subject: "Account Approval Notification",
  //             message: `
  //               Hi, ${_appravalUser.first_name} ${_appravalUser.last_name} \n
  //               New user has been created in portal, need approval by you for activate account. \n
  //               New user details is\n 
  //               Aadhaar Id : "${params.id}"\n
  //               Email : "${params.email}"\n
  //               First Name : "${params.first_name}"\n
  //               Last Name: "${params.last_name}"\n
  //               Mobile: "${params.mobile}"\n
  //               `
  //           };

  //           Nx.mail.sendMail(
  //             appMailMsg.to,
  //             appMailMsg.subject,
  //             appMailMsg.message,
  //             false
  //           );

  //           const smsMsgApp = `
  //             Account Approval Notification\n
  //             New user has been created in portal, check portal.
  //           `;
  //           Nx.sms.sendSms(_appravalUser.mobile, smsMsgApp);
  //         }
  //       }

  //       res.json({ status: true, message: "Add Record Successfully" });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.json({ status: false, message: err });
  //   }
  // }

  // // Update Item
  // async update(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const queryGetUser = `SELECT * FROM users WHERE id = ${params.id}`;
  //     const result = await CQL.executeQuery(queryGetUser, []);
  //     if (result && result.rows && result.rows.length > 0) {
  //       const _user = result.rows[0];

  //       const isEmailVerified =
  //         _user.email === params.email ? _user.is_email_verified : false;
  //       const isMobileVerified =
  //         _user.mobile === params.mobile ? _user.is_mobile_verified : false;
  //       const isApproved =
  //         _user.approved_by == params.approved_by ? _user.is_approved : false;

  //       const query = `
  //       UPDATE users
  //       SET first_name = ?, last_name =?, email = ?, mobile = ?, is_email_verified = ?, is_mobile_verified = ?,
  //       gender = ?, designation = ?, birth_date = ?, state_id = ?, state_name = ?, district_id = ?, district_name = ?,
  //       taluk_id = ?, taluk_name = ?, csv2json_id = ?, csv2json_name = ?, role_id = ?, role_name = ?, role_level = ?,
  //       is_active = ?, approved_by = ?, is_approved = ?, parent_id = ?
  //       WHERE id = ?
  //     `;
  //       const qParams = [
  //         params.first_name,
  //         params.last_name,
  //         params.email,
  //         params.mobile,
  //         isEmailVerified,
  //         isMobileVerified,
  //         params.gender,
  //         params.designation,
  //         params.birth_date,
  //         params.state_id,
  //         params.state_name,
  //         params.district_id,
  //         params.district_name,
  //         params.taluk_id,
  //         params.taluk_name,
  //         params.csv2json_id,
  //         params.csv2json_name,
  //         params.role_id,
  //         params.role_name,
  //         params.role_level,
  //         params.is_active,
  //         params.approved_by,
  //         isApproved,
  //         params.parent_id,
  //         params.id
  //       ];
  //       await CQL.executeQuery(query, qParams);
  //       res.json({ status: true, message: "Update user successfully." });
  //     }
  //     res.json({ status: false, message: "User not found" });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // // Update Profile
  // async updateProfile(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query = `
  //         UPDATE users 
  //         SET first_name = ?, last_name = ?, gender = ?, updated_at = dateof(now())
  //         WHERE id = ?
  //       `;
  //     const qParams = [
  //       params.first_name,
  //       params.last_name,
  //       params.gender,
  //       params.id
  //     ];
  //     await CQL.executeQuery(query, qParams);
  //     res.json({ status: true, data: [] });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async updateEmail(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query = `
  //         UPDATE users 
  //         SET email=?, is_email_verified=?, updated_at=dateof(now())
  //         WHERE id = ?
  //       `;
  //     const qParams = [params.email, params.is_email_verified, params.id];
  //     await CQL.executeQuery(query, qParams);
  //     res.json({ status: true, data: [] });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async verifyEmail(req: Request, res: Response) {
  //   const params = req.body;
  //   try {
  //     const query = "SELECT * FROM users WHERE id = ? ALLOW FILTERING";
  //     const values = [params.id];
  //     const result = await CQL.executeQuery(query, values);
  //     if (result && result.rows && result.rows.length > 0) {
  //       const _user = result.rows[0];

  //       res.json({ status: true, data: [] });
  //     } else {
  //       res.json({ status: false, message: "User not found" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async updateMobile(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query = `
  //         UPDATE users 
  //         SET mobile=?, is_mobile_verified=?, mobile_verification_code=?, updated_at=dateof(now())
  //         WHERE id = ?
  //       `;
  //     const qParams = [params.mobile, false, null, params.id];
  //     await CQL.executeQuery(query, qParams);
  //     res.json({ status: true, data: [] });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async verifyMobile(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query1 = `SELECT * FROM users WHERE id = ? ALLOW FILTERING`;
  //     const qParams1 = [params.id];
  //     const result = await CQL.executeQuery(query1, qParams1);
  //     if (result && result.rows && result.rows.length > 0) {
  //       const _user = result.rows[0];
  //       if (_user["mobile_verification_code"] === params["code"]) {
  //         const query2 = `
  //           UPDATE users SET is_mobile_verified=?,mobile_verification_code=null, updated_at=dateof(now()) 
  //           WHERE id = ?;
  //         `;
  //         const values = [true, _user.id];
  //         await CQL.executeQuery(query2, values);

  //         res.json({
  //           status: true,
  //           message: "Mobile is verified successfully."
  //         });
  //       } else {
  //         res.json({ status: false, message: "Invalid Code" });
  //       }
  //     } else {
  //       res.json({ status: false, message: "Invalid Code" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // // sendMobileVerificationCode
  // async sendMobileVerificationCode(req: Request, res: Response) {
  //   try {
  //     const params = req.body;

  //     const code = Nx.utils.getRandam(1000, 9999);
  //     const message = `Karanataka csv2json Admin Portal\n verification code : ${code}`;

  //     const queryUpdateUser = `UPDATE users SET mobile_verification_code = ? WHERE id = ?;`;
  //     const resultUpdate = await CQL.executeQuery(queryUpdateUser, [
  //       code,
  //       params.id
  //     ]);

  //     Nx.sms
  //       .sendSms(params.mobile, message)
  //       .then((data: any) => {
  //         res.json({
  //           status: true,
  //           message: "Verification code has been sent."
  //         });
  //       })
  //       .catch((err: any) => {
  //         res.json({ status: false, message: "Please try again / later." });
  //       });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // async approvedUser(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query = `
  //         UPDATE users 
  //         SET approved_by=?, approved_at=dateof(now()), updated_at=dateof(now()),
  //           is_active=?, is_approved=?
  //         WHERE id = ?
  //       `;
  //     const qParams = [
  //       params.approved_by,
  //       params.is_active,
  //       params.is_approved,
  //       params.id
  //     ];
  //     await CQL.executeQuery(query, qParams);

  //     if (params.is_active === true && params.is_approved === true) {
  //       const queryS = `SELECT * FROM users WHERE id = ${params.id}`;
  //       const result = await CQL.executeQuery(queryS, []);

  //       if (result && result.rows && result.rows.length > 0) {
  //         const user = result.rows[0];

  //         const mailMsg = {
  //           to: user.email,
  //           subject: "Account activation",
  //           message: `
  //             Hi, ${user.first_name} ${user.last_name} \n
  //             Welcome to admin portal, Your account has been activated successfully. \n
  //           `
  //         };
  //         Nx.mail.sendMail(mailMsg.to, mailMsg.subject, mailMsg.message, false);

  //         const message = `
  //           Karanataka csv2json Admin Portal
  //           Your account has been activated successfully.
  //         `;
  //         const smsResponse = await Nx.sms.sendSms(user.mobile, message);
  //       }
  //     }

  //     res.json({ status: true, data: [] });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // // Delete
  // async remove(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query = `
  //         DELETE FROM users WHERE id = ?
  //       `;
  //     const qParams = [params.id];
  //     const result = await CQL.executeQuery(query, qParams);
  //     res.json({ status: true, data: result });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // // Change Password
  // async changePassword(req: Request, res: Response) {
  //   try {
  //     const params = req.body;

  //     const query = `SELECT * FROM users where id=${
  //       params.id
  //     } ALLOW FILTERING;`;
  //     const result = await CQL.executeQuery(query, []);

  //     if (result && result.rows && result.rows.length > 0) {
  //       const user = result.rows[0];

  //       const isValidPw = bcryptjs.compareSync(
  //         params.password,
  //         user.password_hash
  //       );

  //       if (isValidPw === true) {
  //         let eModel = new EncryptionModel();
  //         eModel = Nx.encryption.encrypt(params.newPassword);

  //         const queryUpdate = `
  //           UPDATE users SET password_hash = ?, salt_key = ?
  //           WHERE id = ?
  //         `;
  //         const values = [eModel.passwordHash, eModel.saltKey, params.id];
  //         await CQL.executeQuery(queryUpdate, values);
  //         res.json({
  //           status: true,
  //           message: "Password has been updated successfully."
  //         });
  //       } else {
  //         res.json({
  //           status: false,
  //           message: "Invalid Password"
  //         });
  //       }
  //     } else {
  //       res.json({ status: false, message: "invalid user" });
  //     }
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }

  // // Upload Profile Picture
  // async UpdateProfilePicture(req: Request, res: Response) {
  //   try {
  //     const params = req.body;
  //     const query = `UPDATE users SET image_path = ? WHERE id = ?;`;
  //     const qParams = [params.image_path, params.id];
  //     const result = await CQL.executeQuery(query, qParams);
  //     res.json({ status: true, data: result });
  //   } catch (error) {
  //     res.json({ status: false, message: error });
  //   }
  // }
}
