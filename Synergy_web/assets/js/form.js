document.addEventListener("DOMContentLoaded", (function() {
    const e = document.getElementById("bookingForm")
      , t = document.getElementById("formMessage");
    function a(e, t) {
        const a = document.createElement("div");
        a.className = "error-message",
        a.textContent = t,
        e.parentNode.insertBefore(a, e.nextSibling)
    }
    e.addEventListener("submit", (function(n) {
        n.preventDefault(),
        function() {
            let t = !0;
            return e.querySelectorAll("[data-validation]").forEach((e => {
                e.dataset.validation.split(" ").forEach((n => {
                    switch (n) {
                    case "required":
                        e.value.trim() || (a(e, "This field is required"),
                        t = !1);
                        break;
                    case "email":
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value) || (a(e, "Please enter a valid email address"),
                        t = !1);
                        break;
                    case "date":
                        /^\d{4}-\d{2}-\d{2}$/.test(e.value) || (a(e, "Please enter a valid date (YYYY-MM-DD)"),
                        t = !1);
                        break;
                    case "time":
                        /^([01]\d|2[0-3]):([0-5]\d)$/.test(e.value) || (a(e, "Please enter a valid time (HH:MM)"),
                        t = !1)
                    }
                }
                ))
            }
            )),
            t
        }() && function() {
            const a = new FormData(e);
            fetch(e.action, {
                method: "POST",
                body: a
            }).then((e => e.text())).then((a => {
                t.innerHTML = a,
                a.includes("Thank you for your booking") && e.reset()
            }
            )).catch((e => {
                t.innerHTML = "An error occurred. Please try again later.",
                console.error("Error:", e)
            }
            ))
        }()
    }
    ))
}
));
