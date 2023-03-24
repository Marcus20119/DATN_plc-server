import * as getService from '../services/getService';

class GetController {
  async getHome(req, res) {
    try {
      res.render('home');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new GetController();
