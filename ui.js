// ui.js — модалки, видео, изображения, service worker

(function () {
    "use strict";

    // ======== ОТКРЫТЬ ТЕКСТОВУЮ МОДАЛКУ ========
    function openModal(html) {
        const modal = document.getElementById("modal");
        const modalContent = document.getElementById("modalContent");
        if (!modal || !modalContent) return;

        modalContent.innerHTML = html;
        modal.style.display = "flex";
    }

    // ======== ОТКРЫТЬ ВИДЕО В МОДАЛКЕ ========
    function openVideo(url) {
        const modal = document.getElementById("modal");
        const modalContent = document.getElementById("modalContent");
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <video id="modalVideo" controls autoplay style="width: 100%; max-height: 80vh; border-radius: 10px;">
                <source src="${url}" type="video/mp4">
                Ваш браузер не поддерживает видео.
            </video>
        `;

        modal.style.display = "flex";
    }

    // ======== ЗАКРЫТЬ МОДАЛКУ ========
    function closeModal() {
        const modal = document.getElementById("modal");
        if (!modal) return;

        const video = modal.querySelector("#modalVideo");
        if (video) {
            try {
                video.pause();
                video.currentTime = 0;
            } catch (err) {}
        }

        modal.style.display = "none";

        const modalContent = document.getElementById("modalContent");
        if (modalContent) modalContent.innerHTML = "";
    }

    // ======== ОТКРЫТЬ ИЗОБРАЖЕНИЕ ========
    function openImage(src) {
        const imgModal = document.getElementById("imgModal");
        const imgContent = document.getElementById("imgModalContent");

        if (!imgModal || !imgContent) return;

        imgContent.src = src;
        imgModal.style.display = "flex";
    }

    // ======== ЗАКРЫТЬ ИЗОБРАЖЕНИЕ ========
    function closeImage() {
        const imgModal = document.getElementById("imgModal");
        const imgContent = document.getElementById("imgModalContent");

        if (!imgModal || !imgContent) return;

        imgModal.style.display = "none";
        imgContent.src = "";
    }

    // Делаем функции глобальными (для вызова из HTML)
    window.openModal = openModal;
    window.openVideo = openVideo;
    window.closeModal = closeModal;
    window.openImage = openImage;
    window.closeImage = closeImage;

    // ======== РЕГИСТРАЦИЯ SERVICE WORKER ========
    if ("serviceWorker" in navigator) {
        try {
            navigator.serviceWorker.register("service-worker.js").catch(() => {});
        } catch (e) {}
    }

    // ======== ЗАКРЫТИЕ МОДАЛКИ ПО КЛИКУ ВНЕ ОКНА ========
    document.addEventListener(
        "click",
        function (e) {
            const modal = document.getElementById("modal");
            if (modal && modal.style.display === "flex") {
                const container = modal.querySelector("div");
                if (container && !container.contains(e.target)) {
                    closeModal();
                }
            }

            const imgModal = document.getElementById("imgModal");
            if (imgModal && imgModal.style.display === "flex") {
                const imgInner = document.getElementById("imgModalContent");
                if (imgInner && !imgInner.contains(e.target)) {
                    imgModal.style.display = "none";
                }
            }
        },
        true
    );
})();
