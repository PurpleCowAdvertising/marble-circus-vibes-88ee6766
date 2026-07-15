/**

 * ScorpionKingsSignupForm.tsx
 *
 * React port of the Sony Music Fans (SMF) newsletter signup form supplied
 * by Sony for the Scorpion Kings site. Preserves all original field names,
 * hidden campaign IDs, and mailing-list IDs so submissions land in the same
 * Sony CRM segment/brand/form as the original jQuery version — just posted
 * via native fetch instead of jQuery.serialize(), and rendered as
 * controlled React inputs instead of raw DOM.
 *
 * Original endpoint: https://subs.sonymusicfans.com/submit
 */

import { useState } from "react";

const COUNTRIES: { code: string; name: string }[] = [

  { code: "AF", name: "Afghanistan" },

  { code: "AL", name: "Albania" },

  { code: "DZ", name: "Algeria" },

  { code: "AS", name: "American Samoa" },

  { code: "AD", name: "Andorra" },

  { code: "AO", name: "Angola" },

  { code: "AI", name: "Anguilla" },

  { code: "AQ", name: "Antarctica" },

  { code: "AG", name: "Antigua & Barbuda" },

  { code: "AR", name: "Argentina" },

  { code: "AM", name: "Armenia" },

  { code: "AW", name: "Aruba" },

  { code: "AU", name: "Australia" },

  { code: "AT", name: "Austria" },

  { code: "AZ", name: "Azerbaijan" },

  { code: "BS", name: "Bahamas" },

  { code: "BH", name: "Bahrain" },

  { code: "BD", name: "Bangladesh" },

  { code: "BB", name: "Barbados" },

  { code: "BY", name: "Belarus" },

  { code: "BE", name: "Belgium" },

  { code: "BZ", name: "Belize" },

  { code: "BJ", name: "Benin" },

  { code: "BM", name: "Bermuda" },

  { code: "BT", name: "Bhutan" },

  { code: "BO", name: "Bolivia" },

  { code: "BA", name: "Bosnia & Herzegovina" },

  { code: "BW", name: "Botswana" },

  { code: "BV", name: "Bouvet Island" },

  { code: "BR", name: "Brazil" },

  { code: "IO", name: "British Indian Ocean Territory" },

  { code: "VG", name: "British Virgin Islands" },

  { code: "BN", name: "Brunei" },

  { code: "BG", name: "Bulgaria" },

  { code: "BF", name: "Burkina Faso" },

  { code: "BI", name: "Burundi" },

  { code: "KH", name: "Cambodia" },

  { code: "CM", name: "Cameroon" },

  { code: "CA", name: "Canada" },

  { code: "CV", name: "Cape Verde" },

  { code: "BQ", name: "Caribbean Netherlands" },

  { code: "KY", name: "Cayman Islands" },

  { code: "CF", name: "Central African Republic" },

  { code: "TD", name: "Chad" },

  { code: "CL", name: "Chile" },

  { code: "CN", name: "China" },

  { code: "CX", name: "Christmas Island" },

  { code: "CC", name: "Cocos (Keeling) Islands" },

  { code: "CO", name: "Colombia" },

  { code: "KM", name: "Comoros" },

  { code: "CG", name: "Congo - Brazzaville" },

  { code: "CD", name: "Congo - Kinshasa" },

  { code: "CK", name: "Cook Islands" },

  { code: "CR", name: "Costa Rica" },

  { code: "HR", name: "Croatia" },

  { code: "CU", name: "Cuba" },

  { code: "CW", name: "Curaçao" },

  { code: "CY", name: "Cyprus" },

  { code: "CZ", name: "Czechia" },

  { code: "CI", name: "Côte d’Ivoire" },

  { code: "DK", name: "Denmark" },

  { code: "DJ", name: "Djibouti" },

  { code: "DM", name: "Dominica" },

  { code: "DO", name: "Dominican Republic" },

  { code: "EC", name: "Ecuador" },

  { code: "EG", name: "Egypt" },

  { code: "SV", name: "El Salvador" },

  { code: "GQ", name: "Equatorial Guinea" },

  { code: "ER", name: "Eritrea" },

  { code: "EE", name: "Estonia" },

  { code: "SZ", name: "Eswatini" },

  { code: "ET", name: "Ethiopia" },

  { code: "FK", name: "Falkland Islands" },

  { code: "FO", name: "Faroe Islands" },

  { code: "FJ", name: "Fiji" },

  { code: "FI", name: "Finland" },

  { code: "FR", name: "France" },

  { code: "GF", name: "French Guiana" },

  { code: "PF", name: "French Polynesia" },

  { code: "TF", name: "French Southern Territories" },

  { code: "GA", name: "Gabon" },

  { code: "GM", name: "Gambia" },

  { code: "GE", name: "Georgia" },

  { code: "DE", name: "Germany" },

  { code: "GH", name: "Ghana" },

  { code: "GI", name: "Gibraltar" },

  { code: "GR", name: "Greece" },

  { code: "GL", name: "Greenland" },

  { code: "GD", name: "Grenada" },

  { code: "GP", name: "Guadeloupe" },

  { code: "GU", name: "Guam" },

  { code: "GT", name: "Guatemala" },

  { code: "GG", name: "Guernsey" },

  { code: "GN", name: "Guinea" },

  { code: "GW", name: "Guinea-Bissau" },

  { code: "GY", name: "Guyana" },

  { code: "HT", name: "Haiti" },

  { code: "HM", name: "Heard & McDonald Islands" },

  { code: "HN", name: "Honduras" },

  { code: "HK", name: "Hong Kong SAR China" },

  { code: "HU", name: "Hungary" },

  { code: "IS", name: "Iceland" },

  { code: "IN", name: "India" },

  { code: "ID", name: "Indonesia" },

  { code: "IR", name: "Iran" },

  { code: "IQ", name: "Iraq" },

  { code: "IE", name: "Ireland" },

  { code: "IM", name: "Isle of Man" },

  { code: "IL", name: "Israel" },

  { code: "IT", name: "Italy" },

  { code: "JM", name: "Jamaica" },

  { code: "JP", name: "Japan" },

  { code: "JE", name: "Jersey" },

  { code: "JO", name: "Jordan" },

  { code: "KZ", name: "Kazakhstan" },

  { code: "KE", name: "Kenya" },

  { code: "KI", name: "Kiribati" },

  { code: "XK", name: "Kosovo" },

  { code: "KW", name: "Kuwait" },

  { code: "KG", name: "Kyrgyzstan" },

  { code: "LA", name: "Laos" },

  { code: "LV", name: "Latvia" },

  { code: "LB", name: "Lebanon" },

  { code: "LS", name: "Lesotho" },

  { code: "LR", name: "Liberia" },

  { code: "LY", name: "Libya" },

  { code: "LI", name: "Liechtenstein" },

  { code: "LT", name: "Lithuania" },

  { code: "LU", name: "Luxembourg" },

  { code: "MO", name: "Macao SAR China" },

  { code: "MG", name: "Madagascar" },

  { code: "MW", name: "Malawi" },

  { code: "MY", name: "Malaysia" },

  { code: "MV", name: "Maldives" },

  { code: "ML", name: "Mali" },

  { code: "MT", name: "Malta" },

  { code: "MH", name: "Marshall Islands" },

  { code: "MQ", name: "Martinique" },

  { code: "MR", name: "Mauritania" },

  { code: "MU", name: "Mauritius" },

  { code: "YT", name: "Mayotte" },

  { code: "MX", name: "Mexico" },

  { code: "FM", name: "Micronesia" },

  { code: "MD", name: "Moldova" },

  { code: "MC", name: "Monaco" },

  { code: "MN", name: "Mongolia" },

  { code: "ME", name: "Montenegro" },

  { code: "MS", name: "Montserrat" },

  { code: "MA", name: "Morocco" },

  { code: "MZ", name: "Mozambique" },

  { code: "MM", name: "Myanmar (Burma)" },

  { code: "NA", name: "Namibia" },

  { code: "NR", name: "Nauru" },

  { code: "NP", name: "Nepal" },

  { code: "NL", name: "Netherlands" },

  { code: "NC", name: "New Caledonia" },

  { code: "NZ", name: "New Zealand" },

  { code: "NI", name: "Nicaragua" },

  { code: "NE", name: "Niger" },

  { code: "NG", name: "Nigeria" },

  { code: "NU", name: "Niue" },

  { code: "NF", name: "Norfolk Island" },

  { code: "KP", name: "North Korea" },

  { code: "MK", name: "North Macedonia" },

  { code: "MP", name: "Northern Mariana Islands" },

  { code: "NO", name: "Norway" },

  { code: "OM", name: "Oman" },

  { code: "PK", name: "Pakistan" },

  { code: "PW", name: "Palau" },

  { code: "PS", name: "Palestinian Territories" },

  { code: "PA", name: "Panama" },

  { code: "PG", name: "Papua New Guinea" },

  { code: "PY", name: "Paraguay" },

  { code: "PE", name: "Peru" },

  { code: "PH", name: "Philippines" },

  { code: "PN", name: "Pitcairn Islands" },

  { code: "PL", name: "Poland" },

  { code: "PT", name: "Portugal" },

  { code: "PR", name: "Puerto Rico" },

  { code: "QA", name: "Qatar" },

  { code: "RO", name: "Romania" },

  { code: "RU", name: "Russia" },

  { code: "RW", name: "Rwanda" },

  { code: "RE", name: "Réunion" },

  { code: "WS", name: "Samoa" },

  { code: "SM", name: "San Marino" },

  { code: "SA", name: "Saudi Arabia" },

  { code: "SN", name: "Senegal" },

  { code: "RS", name: "Serbia" },

  { code: "SC", name: "Seychelles" },

  { code: "SL", name: "Sierra Leone" },

  { code: "SG", name: "Singapore" },

  { code: "SX", name: "Sint Maarten" },

  { code: "SK", name: "Slovakia" },

  { code: "SI", name: "Slovenia" },

  { code: "SB", name: "Solomon Islands" },

  { code: "SO", name: "Somalia" },

  { code: "ZA", name: "South Africa" },

  { code: "GS", name: "South Georgia & South Sandwich Islands" },

  { code: "KR", name: "South Korea" },

  { code: "SS", name: "South Sudan" },

  { code: "ES", name: "Spain" },

  { code: "LK", name: "Sri Lanka" },

  { code: "BL", name: "St. Barthélemy" },

  { code: "SH", name: "St. Helena" },

  { code: "KN", name: "St. Kitts & Nevis" },

  { code: "LC", name: "St. Lucia" },

  { code: "MF", name: "St. Martin" },

  { code: "PM", name: "St. Pierre & Miquelon" },

  { code: "VC", name: "St. Vincent & Grenadines" },

  { code: "SD", name: "Sudan" },

  { code: "SR", name: "Suriname" },

  { code: "SJ", name: "Svalbard & Jan Mayen" },

  { code: "SE", name: "Sweden" },

  { code: "CH", name: "Switzerland" },

  { code: "SY", name: "Syria" },

  { code: "ST", name: "São Tomé & Príncipe" },

  { code: "TW", name: "Taiwan" },

  { code: "TJ", name: "Tajikistan" },

  { code: "TZ", name: "Tanzania" },

  { code: "TH", name: "Thailand" },

  { code: "TL", name: "Timor-Leste" },

  { code: "TG", name: "Togo" },

  { code: "TK", name: "Tokelau" },

  { code: "TO", name: "Tonga" },

  { code: "TT", name: "Trinidad & Tobago" },

  { code: "TN", name: "Tunisia" },

  { code: "TM", name: "Turkmenistan" },

  { code: "TC", name: "Turks & Caicos Islands" },

  { code: "TV", name: "Tuvalu" },

  { code: "TR", name: "Türkiye" },

  { code: "UM", name: "U.S. Outlying Islands" },

  { code: "VI", name: "U.S. Virgin Islands" },

  { code: "UG", name: "Uganda" },

  { code: "UA", name: "Ukraine" },

  { code: "AE", name: "United Arab Emirates" },

  { code: "GB", name: "United Kingdom" },

  { code: "US", name: "United States" },

  { code: "UY", name: "Uruguay" },

  { code: "UZ", name: "Uzbekistan" },

  { code: "VU", name: "Vanuatu" },

  { code: "VA", name: "Vatican City" },

  { code: "VE", name: "Venezuela" },

  { code: "VN", name: "Vietnam" },

  { code: "WF", name: "Wallis & Futuna" },

  { code: "EH", name: "Western Sahara" },

  { code: "YE", name: "Yemen" },

  { code: "ZM", name: "Zambia" },

  { code: "ZW", name: "Zimbabwe" },

  { code: "AX", name: "Åland Islands" },

];

const MAILING_LISTS = [

  { id: "a0S1p00000UGdJTEA1", label: "I'd like to subscribe to the DJ Maphorisa newsletter" },

  { id: "a0S0800000W7JEvEAN", label: "I'd like to subscribe to the Kabza De Small newsletter" },

  { id: "a0S0800000W81P9EAJ", label: "I'd like to subscribe to the Dance newsletter" },

  { id: "a0S24000005SowPEAS", label: "I'd like to subscribe to the Sony Music Africa newsletter" },

  { id: "a0S0800000VfjfuEAB", label: "I'd like to subscribe to the Sony Music South Africa newsletter" },

];

type FormState = {

  field_first_name: string;

  field_last_name: string;

  field_mobile_phone: string;

  field_email_address: string;

  field_country_region: string;

};

const initialState: FormState = {

  field_first_name: "",

  field_last_name: "",

  field_mobile_phone: "",

  field_email_address: "",

  field_country_region: "",

};

export function ScorpionKingsSignupForm() {

  const [fields, setFields] = useState<FormState>(initialState);

  const [subscribedLists, setSubscribedLists] = useState<string[]>([]);

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (key: keyof FormState) => (

    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleList = (id: string) =>

    setSubscribedLists((prev) =>

      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]

    );

  const validate = (): string | null => {

    if (!fields.field_first_name.trim()) return "Enter your first name";

    if (!fields.field_last_name.trim()) return "Enter your last name";

    if (!fields.field_mobile_phone.trim()) return "Enter your mobile phone number";

    if (!fields.field_email_address.trim()) return "Enter your email address";

    if (!fields.field_country_region) return "Enter your country or region";

    return null;

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const validationError = validate();

    if (validationError) {

      setErrorMsg(validationError);

      return;

    }

    setErrorMsg(null);

    setStatus("sending");

    const body = new URLSearchParams();

    body.set("js_url", "https://subs.sonymusicfans.com/submit");

    body.set("ae_segment_id", "2815861");

    body.set("ae_brand_id", "4307835");

    body.set("form", "764269");

    body.set("field_first_name", fields.field_first_name);

    body.set("field_last_name", fields.field_last_name);

    body.set("field_mobile_phone", fields.field_mobile_phone);

    body.set("field_email_address", fields.field_email_address);

    body.set("field_country_region", fields.field_country_region);

    // Mirrors the original hidden "confirmation_email" checkbox, which was

    // always checked by default in the source form.

    body.append("triggered_sends[]", "");

    // Only the lists the fan actually opted into get sent, matching the

    // original's per-checkbox triggered_sends[] + mailing-list-id[] pairing.

    subscribedLists.forEach((id) => {

      body.append("triggered_sends[]", "");

      body.append("mailing-list-id[]", id);

    });

    try {

      const res = await fetch("https://subs.sonymusicfans.com/submit", {

        method: "POST",

        headers: { "Content-Type": "application/x-www-form-urlencoded" },

        body,

      });

      if (!res.ok) throw new Error(`Submit failed with status ${res.status}`);

      setStatus("ok");

      setFields(initialState);

      setSubscribedLists([]);

    } catch (err) {

      setStatus("error");

      setErrorMsg("An error has occurred! Please try again.");

    }

  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">

      <div className="form-group">

        <label htmlFor="field_first_name">First Name</label>

        <input

          className="form-control"

          id="field_first_name"

          name="field_first_name"

          type="text"

          value={fields.field_first_name}

          onChange={update("field_first_name")}

          required

        />

      </div>

      <div className="form-group">

        <label htmlFor="field_last_name">Last Name</label>

        <input

          className="form-control"

          id="field_last_name"

          name="field_last_name"

          type="text"

          value={fields.field_last_name}

          onChange={update("field_last_name")}

          required

        />

      </div>

      <div className="form-group">

        <label htmlFor="field_mobile_phone">Mobile Phone</label>

        <input

          className="form-control"

          id="field_mobile_phone"

          name="field_mobile_phone"

          type="text"

          value={fields.field_mobile_phone}

          onChange={update("field_mobile_phone")}

          required

        />

      </div>

      <div className="form-group">

        <label htmlFor="field_email_address">Email Address</label>

        <input

          className="form-control"

          id="field_email_address"

          name="field_email_address"

          type="email"

          value={fields.field_email_address}

          onChange={update("field_email_address")}

          required

        />

      </div>

      <div className="form-group">

        <label htmlFor="field_country_region">Country</label>

        <select

          className="form-control"

          id="field_country_region"

          name="field_country_region"

          value={fields.field_country_region}

          onChange={update("field_country_region")}

          required

        >

          <option value="" disabled>

            Select a country

          </option>

          {COUNTRIES.map((c) => (

            <option key={c.code} value={c.code}>

              {c.name}

            </option>

          ))}

        </select>

      </div>

      <fieldset className="space-y-2">

        <legend className="text-sm font-medium">Newsletter preferences</legend>

        {MAILING_LISTS.map((list) => (

          <label key={list.id} className="flex items-center gap-2 text-sm">

            <input

              type="checkbox"

              className="mailing-list-id"

              checked={subscribedLists.includes(list.id)}

              onChange={() => toggleList(list.id)}

            />

            {list.label}

          </label>

        ))}

      </fieldset>

      <button type="submit" className="btn btn-default" disabled={status === "sending"}>

        {status === "sending" ? "Submitting..." : "Submit"}

      </button>

      {status === "ok" && <p role="status">Submitted!</p>}

      {(status === "error" || errorMsg) && (

        <p role="alert" className="text-red-600">

          {errorMsg ?? "An error has occurred!"}

        </p>

      )}

    </form>

  );

}

export default ScorpionKingsSignupForm;