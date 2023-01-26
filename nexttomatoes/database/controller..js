import Users from "../model/user";

export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "Users not found" });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Error requete" });
  }
}

export async function getUser(req, res) {
  try {
    const userId = req.query.userName;

    const user = await Users.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "cannot get user" });
  }
}

export async function putUser(req, res) {
  try {
    const userId = req.query.userName;
    const formData = req.body;

    await Users.findByIdAndUpdate(userId, formData);
    return res.status(200).json(formData);
  } catch (error) {
    res.status(404).json({ error: "Error Update" });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.query.userName;
    const user = await Users.findByIdAndDelete(userId);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: "Error delete" });
  }
}

