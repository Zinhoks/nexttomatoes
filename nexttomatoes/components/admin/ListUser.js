import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../../_service/userService";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../redux/reducer";

export default function ListUser() {
  const { data, status } = useQuery("users", getUsers);

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py0-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py0-2">
            <span className="text-gray-200">Created at</span>
          </th>
          <th className="px-16 py0-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py0-2">
            <span className="text-gray-200">Edit/Delet</span>
          </th>
        </tr>
      </thead>

      <tbody className="bg-gray-200">
        {data?.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}
function Tr({ _id, name, email, status, createdAt }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2">
        <span>{name}</span>
      </td>

      <td className="px-16 py-2">
        <span>{email}</span>
      </td>

      <td className="px-16 py-2">
        <span>{createdAt}</span>
      </td>

      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              status == "admin" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justiify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
