import React, { useState } from "react";

export const ScorpionKingsForm = () => {
  const [formData, setFormData] = useState({
    field_first_name: "",
    field_last_name: "",
    field_mobile_phone: "",
    field_email_address: "",
    field_country_region: "ZA", // Defaults to South Africa
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    // Format data as urlencoded (mimicking jQuery serialize)
    const urlParams = new URLSearchParams();
    urlParams.append("js_url", "https://subs.sonymusicfans.com/submit");
    urlParams.append("ae_segment_id", "2815861");
    urlParams.append("ae_brand_id", "4307835");
    urlParams.append("form", "764269");
    urlParams.append("field_first_name", formData.field_first_name);
    urlParams.append("field_last_name", formData.field_last_name);
    urlParams.append("field_mobile_phone", formData.field_mobile_phone);
    urlParams.append("field_email_address", formData.field_email_address);
    urlParams.append("field_country_region", formData.field_country_region);
    urlParams.append("triggered_sends[]", "");

    // List IDs from the original hidden form
    const mailingLists = [
      "a0S1p00000UGdJTEA1", // DJ Maphorisa
      "a0S0800000W7JEvEAN", // Kabza De Small
      "a0S0800000W81P9EAJ", // Dance
      "a0S24000005SowPEAS", // Sony Music Africa
      "a0S0800000VfjfuEAB", // Sony Music South Africa
    ];

    mailingLists.forEach((id, index) => {
      urlParams.append(`mailing-list-id[${index}]`, id);
    });

    try {
      const response = await fetch("https://subs.sonymusicfans.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlParams.toString(),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Successfully subscribed!" });
        setFormData({
          field_first_name: "",
          field_last_name: "",
          field_mobile_phone: "",
          field_email_address: "",
          field_country_region: "ZA",
        });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setStatus({ type: "error", message: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Join the Scorpion Kings Mailing List</h2>

      {status.type && (
        <div
          className={`p-4 mb-4 rounded ${status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="field_first_name"
            value={formData.field_first_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="field_last_name"
            value={formData.field_last_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Phone</label>
          <input
            type="tel"
            name="field_mobile_phone"
            value={formData.field_mobile_phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="field_email_address"
            value={formData.field_email_address}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <select
            name="field_country_region"
            value={formData.field_country_region}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="ZA">South Africa</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            {/* Add other country options as needed or use a package */}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
