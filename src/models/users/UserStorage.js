const db = require("../../config/db.config");

class UserStorage {
  static select (id) {  
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query,[id], (err, data) => {
        if(err) reject(`${err}`)
        else resolve(data[0]);
      })
    })
  }

  static insert (user) {
    console.log(user);
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, email, nickName, pwd, role) VALUES(?, ?, ? ,?, ?);";
      db.query(query,[user.id, user.email, user.name, user.pw, user.role], (err, data) => {
        console.log(err);
        if(err) reject(`${err}`);
        else resolve({success : true});
      })
    })
  }

  static update(param) {
    console.log(param);
    let query = 'UPDATE users set ';
    if(param.profileImg){
      query += 'profile_img=? WHERE id=?;';
    }else if(param.nickname){
      query += 'nickname=? WHERE id=?;';
    }else if(param.profile_msg) {
      query += 'profile_msg=? WHERE id=?;';
    }
    
    const queryParam = [param.profileImg || param.nickname || param.profile_msg, param.userId]
    
    return new Promise((resolve, reject) => {
      db.query(
        query,
        queryParam,
        (err, data) => {
          console.log(data);
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    }); 
  }

  static removeImg(userId) {
    console.log(userId);
    const query = 'UPDATE users SET profile_img=null WHERE id=?;'
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [userId],
        (err, data) => {
          console.log(data);
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    }); 
  }

  static selectCurrentImg(userId) {
    console.log(userId);
    const query = 'SELECT profile_img FROM users WHERE id =?;';
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [userId],
        (err, data) => {
          console.log(data[0]);
          if (err) reject(`${err}`);
          else resolve(data[0]);
        }
      );
    }); 
  }
    
/*     const query = `UPDATE users set 
    ${param.nickname ? "nickname=?" : "profile_msg=?"} WHERE id=?;`;

    
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [param.nickname || param.profile_msg, param.id],
        (err, data) => {
          console.log(data);
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    }); 
  } */
}


module.exports = UserStorage;
