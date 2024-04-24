import React, { useEffect, useState } from "react";
import DotLoader from "../../components/DotLoader";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { customModal } from "../../utils/modalUtils";
import { fetchDocument, updateDocument } from "../../config/documents";
import { useModal } from "../../context/ModalContext";
import { useSelector } from "react-redux";

export default function Document() {
  const userId = useSelector((state) => state.user.userId);
  const { showModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [doc, setDoc] = useState([]);
  const [fileDescription, setFileDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const fetchDoc = async () => {
    try {
      const userDoc = await fetchDocument(userId);
      setDoc(userDoc);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  useEffect(() => {
    fetchDoc();
    if (doc) {
      setFileDescription(doc.fileDescription || "");
      setFileName(doc.fileName || "");
    }
  }, [doc]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ensure file and fileDescription are properly defined
      if (!fileDescription) {
        throw new Error("File description must be provided.");
      }

      if (!doc || !doc[0].id) {
        await updateDocument(userId, fileDescription, file);
        customModal({
          showModal,
          title: "Success",
          text: "Document has been added successfully.",
          showConfirmButton: false,
          iconBgColor: "bg-green-100",
          iconTextColor: "text-green-600",
          buttonBgColor: "bg-green-600",
          icon: CheckIcon,
          timer: 1500,
        });
      } else {
        await updateDocument(userId, fileDescription, file, doc[0].id);
        customModal({
          showModal,
          title: "Success",
          text: "Document has been updated successfully.",
          icon: CheckIcon,
          iconBgColor: "bg-green-100",
          iconTextColor: "text-green-600",
          buttonBgColor: "bg-green-600",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setFileDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error during document update:", error);

      // Provide feedback on failure
      customModal({
        showModal,
        title: "Error",
        text: `An error occurred while updating the document: ${error.message}`,
        showConfirmButton: false,
        icon: ExclamationCircleIcon,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        timer: 1500,
      });
    } finally {
      setIsLoading(false); // Ensure loading state is cleared
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else if (doc && doc.length > 0) {
      setFileName(doc[0].downloadURL || "");
    } else {
      setFileName("");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Document Upload
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Ensure there is a (✔️) in front of the file name before submitting.
        </p>
      </div>

      <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleUpdate}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="document-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Document name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fileDescription"
                  id="fileDescription"
                  autoComplete="fileDescription"
                  value={fileDescription || doc[0].fileDescription}
                  onChange={(e) => setFileDescription(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4 flex items-center">
              <input
                type="file"
                name="image"
                id="file"
                className="hidden"
                onChange={handleChange}
                accept="image/pdf/*"
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById("file").click()}
              >
                Choose File
              </button>
              <span className="ml-2 text-sm text-gray-500 flex">
                {fileName || doc[0].fileName}{" "}
                {(file || doc[0].file) && <CheckIcon className="h-5 w-5 text-green-500" />}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <div className="flex w-full justify-center align-middle gap-2">
                <span>Submitting</span>
                <DotLoader />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
