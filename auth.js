
(() => {
    "use strict";

    const MASTER = {
        name: "krish",
        code: "213606"
    };

    // Add individual credentials here.
    // Each name + code combination works once.
    const USERS = [
        // { name: "Student1", code: "583921" },
        // { name: "Student2", code: "729415" }
    ];

    const USED_KEY = "bcasema_used_credentials";
    const SESSION_KEY = "bcasema_session";

    const used = JSON.parse(localStorage.getItem(USED_KEY) || "[]");

    // Keep the website hidden until access is granted.
    document.documentElement.classList.add("bca-locked");

    const style = document.createElement("style");
    style.textContent = `
        body.bca-locked > *:not(#bca-auth-root) {
            visibility: hidden !important;
        }

        #bca-auth-root {
            position: fixed;
            inset: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: #0b1120;
            font-family: Arial, sans-serif;
            color: white;
        }

        #bca-auth-root * { box-sizing: border-box; }

        .bca-card {
            width: 100%;
            max-width: 410px;
            padding: 38px;
            border-radius: 18px;
            background: #151e30;
            border: 1px solid #293750;
            box-shadow: 0 20px 60px #0008;
        }

        .bca-brand {
            color: #55d6a5;
            letter-spacing: 3px;
            font-size: 13px;
        }

        .bca-card h1 {
            font-size: 29px;
            margin: 26px 0 8px;
        }

        .bca-card p {
            color: #9baac0;
            font-size: 14px;
            line-height: 1.6;
        }

        .bca-card label {
            display: block;
            margin: 20px 0 8px;
            font-size: 13px;
            color: #bdc9da;
        }

        .bca-card input {
            width: 100%;
            padding: 14px;
            border-radius: 9px;
            border: 1px solid #34445e;
            background: #0e1728;
            color: white;
            font-size: 15px;
        }

        .bca-card input:focus {
            outline: 1px solid #55d6a5;
        }

        .bca-card button {
            width: 100%;
            padding: 14px;
            margin-top: 24px;
            border: none;
            border-radius: 9px;
            background: #42b995;
            color: #071a16;
            font-weight: bold;
            cursor: pointer;
        }

        .bca-error {
            color: #ff9c9c;
            font-size: 13px;
            margin-top: 15px;
        }

        .bca-footer {
            text-align: center;
            color: #71819a;
            font-size: 11px;
            margin-top: 24px;
        }
    `;

    document.head.appendChild(style);

    function showWebsite() {
        document.body.classList.remove("bca-locked");
        document.getElementById("bca-auth-root")?.remove();
    }

    function showLogin() {
        document.body.classList.add("bca-locked");

        const root = document.createElement("div");
        root.id = "bca-auth-root";

        root.innerHTML = `
            <div class="bca-card">
                <div class="bca-brand">◆ BCA STUDY PORTAL</div>
                <h1>Welcome back.</h1>
                <p>Enter your registered name and unique access code.</p>

                <form id="bca-login-form">
                    <label for="bca-name">Your name</label>
                    <input id="bca-name" required
                        autocomplete="username"
                        placeholder="Enter your name">

                    <label for="bca-code">Unique access code</label>
                    <input id="bca-code" type="password"
                        required autocomplete="current-password"
                        placeholder="Enter your code">

                    <button type="submit">UNLOCK PORTAL →</button>
                    <div class="bca-error" id="bca-error"></div>
                </form>

                <div class="bca-footer">AUTHORIZED ACCESS ONLY</div>
            </div>
        `;

        document.body.appendChild(root);

        document.getElementById("bca-login-form")
            .addEventListener("submit", event => {
                event.preventDefault();

                const name = document.getElementById("bca-name")
                    .value.trim();

                const code = document.getElementById("bca-code").value;

                const error = document.getElementById("bca-error");

                // Unlimited master access.
                if (
                    name.toLowerCase() === MASTER.name.toLowerCase() &&
                    code === MASTER.code
                ) {
                    sessionStorage.setItem(SESSION_KEY, "master");
                    showWebsite();
                    return;
                }

                // Find matching one-time credential.
                const user = USERS.find(item =>
                    item.name.toLowerCase() === name.toLowerCase() &&
                    item.code === code
                );

                const pair = JSON.stringify([
                    name.toLowerCase(),
                    code
                ]);

                if (!user) {
                    error.textContent = "Invalid name or access code.";
                    return;
                }

                if (used.includes(pair)) {
                    error.textContent = "This access code has already been used.";
                    return;
                }

                used.push(pair);
                localStorage.setItem(USED_KEY, JSON.stringify(used));

                sessionStorage.setItem(SESSION_KEY, "user");
                showWebsite();
            });
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (sessionStorage.getItem(SESSION_KEY)) {
            showWebsite();
        } else {
            showLogin();
        }
    });
})();

