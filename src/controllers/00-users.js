export const getUser = (req, res) => {
  res.json('Succes getting user')
}

export const createUser = (req, res) => {
  const data = req.body

  res.json({
    message: `${data.username} created successfully`
  })
}

export const deleteUser = (req, res) => {
  res.json('User deleted successfully')
}

export const updateUser = (req, res) => {
  res.json('User updated successfully')
}
