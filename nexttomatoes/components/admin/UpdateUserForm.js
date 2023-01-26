import { BiBrush } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, updateUser } from "../../_service/userService";

export default function UpdateUserForm({ formId, formData, setFormData }) {

  const queryClient=useQueryClient()
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );
const UpdateMutation = useMutation((newData) => updateUser(formId,newData ),{
  onSuccess: async(data) =>{
    queryClient.setQueryData('users', (old)=> [data])
    queryClient.prefetchQuery('users'.getUsers)
  }
})

   if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const { name, email, status } = data;
  const [firstname] = name ? name.split(' ') : formData


  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname}`
    let updated = Object.assign({}, data, formData,{name: userName})
    console.log(updated)
    await UpdateMutation.mutate(updated)
  };

 

  return (
    <>
      <form className="grid lg:grid-cols-3 w-4/6 gap-4" onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="text"  onChange={setFormData} defaultValue={firstname}
            name="username"
            className="border w-full px-5 py-2 focus:outline-none rounded-md"
            placeholder="name"
          />
        </div>

        <div className="input-type">
          <input
            type="text" onChange={setFormData} defaultValue={email}
            name="email"
            className="border w-full px-5 py-2 focus:outline-none rounded-md"
            placeholder="email"
          />
        </div>

        <div>
          <div className="form-check">
            <input
              type="radio"
              value="user"
              defaultChecked={status == "user"} onChange={setFormData}              id="radioDefault1"
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
              value="admin"
              defaultChecked={status !== "user"} onChange={setFormData} 
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

        <button className="flex justiy-center text-md w2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray50 hover:border-green-500 hover:text-green-500">
          Update
          <span className="px-1">
            <BiBrush size={24}></BiBrush>
          </span>
        </button>
      </form>
    </>
  );
}
