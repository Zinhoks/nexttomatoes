import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../../_service/userService";


export default function AddUserForm({ formData, setFormData }) {
  const queryClient = useQueryClient();
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, email, password, status } = formData;

    const model = {
      name: `${name}`,
      email,
      password,
      status,
    };
    addMutation.mutate(model);
  };
if(addMutation.isSuccess) return <Success message="Utilisateur ajouté"></Success>
  return (
    <>
      <form className="grid lg:grid-cols-3 w-4/6 gap-4" onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="name"
            className="border w-full px-5 py-2 focus:outline-none rounded-md"
            placeholder="name"
          />
        </div>

        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="email"
            className="border w-full px-5 py-2 focus:outline-none rounded-md"
            placeholder="email"
          />
        </div>

        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="password"
            className="border w-full px-5 py-2 focus:outline-none rounded-md"
            placeholder="password"
          />
        </div>

        <div>
          <div className="form-check">
            <input
              type="radio"
              onChange={setFormData}
              value="user"
              id="radioDefault1"
              name="status"
              className="form-check-input appaerance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked: border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-lef mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-800"
            >
              user
            </label>
          </div>
        </div>
        <div>
          <div className="form-check">
            <input
              type="radio"
              onChange={setFormData}
              value="admin"
              id="radioDefault2"
              name="status"
              className="form-check-input appaerance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked: border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-lef mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-800"
            >
              admin
            </label>
          </div>
        </div>

        <button className="flex justiy-center text-md w2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray50 hover:border-green-500 hover:text-green-500">
          Add
          <span className="px-1">
            <BiPlus size={24}></BiPlus>
          </span>
        </button>
      </form>
    </>
  );
}
