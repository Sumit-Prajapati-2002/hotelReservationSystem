"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch all FAQs
  const loadFaqs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/FAQ`, {
        withCredentials: true,
      });

      if (Array.isArray(res.data.faqs)) {
        setFaqs(res.data.faqs);
      } else {
        setFaqs([]);
      }
    } catch (err) {
      console.error("Fetch FAQ error:", err);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Add FAQ
  const handleAdd = async () => {
    if (!question || !answer) return alert("Fill all fields");

    try {
      await axios.post(
        `${BASE_URL}/FAQ`,
        { question, answer },
        { withCredentials: true }
      );

      setAddModalOpen(false);
      setQuestion("");
      setAnswer("");
      loadFaqs();
    } catch (err) {
      console.error("Add FAQ Error:", err);
    }
  };

  // Edit FAQ
  const handleEdit = async () => {
    if (!question || !answer) return alert("Fill all fields");

    try {
      await axios.put(
        `${BASE_URL}/FAQ/${editId}`,
        { question, answer },
        { withCredentials: true }
      );

      setEditModalOpen(false);
      setQuestion("");
      setAnswer("");
      loadFaqs();
    } catch (err) {
      console.error("Edit FAQ Error:", err);
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (!confirm("Delete this FAQ?")) return;

    try {
      await axios.delete(`${BASE_URL}/FAQ/${id}`, {
        withCredentials: true,
      });

      loadFaqs();
    } catch (err) {
      console.error("Delete FAQ Error:", err);
    }
  };

  // Open edit modal
  const openEditModal = (faq) => {
    setEditId(faq.FQA_id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">FAQ Management</h2>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Plus size={20} />
          Add FAQ
        </button>
      </div>

      {/* FAQ Cards */}
      {loading ? (
        <p>Loading FAQs...</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.FQA_id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => openEditModal(faq)}
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => handleDelete(faq.FQA_id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD FAQ Modal */}
      {isAddModalOpen && (
        <Modal
          title="Add FAQ"
          question={question}
          answer={answer}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAdd}
          buttonLabel="Add FAQ"
        />
      )}

      {/* EDIT FAQ Modal */}
      {isEditModalOpen && (
        <Modal
          title="Edit FAQ"
          question={question}
          answer={answer}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleEdit}
          buttonLabel="Save Changes"
        />
      )}
    </div>
  );
}

// Modal Component
function Modal({
  title,
  question,
  answer,
  setQuestion,
  setAnswer,
  onClose,
  onSubmit,
  buttonLabel,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>

        <label className="block mb-2 font-medium">Question</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-lg mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label className="block mb-2 font-medium">Answer</label>
        <textarea
          className="w-full border px-3 py-2 rounded-lg mb-4"
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onSubmit}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
