const about = document.querySelector("#about");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const formulario = document.querySelector("#formulario");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function getAboutGithub() {
    try {
        const response = await fetch("https://api.github.com/users/jackeline5458");
        const data = await response.json();

        about.innerHTML = `
            <img src="${data.avatar_url}" alt="Foto do perfil de ${data.name}" class="about-img">

            <article class="about-content">
                <h2>Sobre mim</h2>

                <p>Olá! Meu nome é Jackeline Pessoa Gomes, sou formada em Gestão da Tecnologia da Informação e atualmente estudo Java Full Stack na Generation Brasil.</p>

                <p>Tenho experiência com sustentação de sistemas, projetos, documentação, comunicação entre equipes e desenvolvimento de aplicações utilizando Java, Spring Boot, MySQL, HTML, CSS e JavaScript.</p>

                <p>Busco desenvolver soluções organizadas, funcionais e acessíveis, sempre evoluindo minhas habilidades técnicas e comportamentais na área de tecnologia.</p>

                <div class="about-buttons-data">
                    <div class="buttons-container">
                        <a href="${data.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>
                </div>

                <div class="data-container">
                    <div class="data-item">
                        <span class="data-number">${data.followers}</span>
                        <span class="data-label">Seguidores</span>
                    </div>

                    <div class="data-item">
                        <span class="data-number">${data.public_repos}</span>
                        <span class="data-label">Repositórios</span>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        console.error("Erro ao buscar dados do GitHub:", error);
    }
}

async function getProjectsGithub() {
    try {
        const response = await fetch("https://api.github.com/users/jackeline5458/repos?sort=updated&per_page=6");
        const repos = await response.json();

        swiperWrapper.innerHTML = "";

        repos.forEach((repo) => {
            const linguagem = repo.language || "GitHub";
            const descricao = repo.description || "Projeto desenvolvido no GitHub";

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-content">
                            <h3>${repo.name}</h3>
                            <p>${descricao}</p>

                            <div class="project-tags">
                                <span class="tag">${linguagem}</span>
                            </div>

                            <div class="project-buttons">
                                <a href="${repo.html_url}" target="_blank" class="botao botao-sm">GitHub</a>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        });

        iniciarSwiper();

    } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);
    }
}

function iniciarSwiper() {
    new Swiper(".projects-swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            769: {
                slidesPerView: 2,
            },
            1025: {
                slidesPerView: 3,
            },
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 2500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        speed: 800,
        grabCursor: true,
    });
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    formulario.querySelectorAll("span").forEach((span) => {
        span.textContent = "";
    });

    let isValid = true;

    const nome = document.querySelector("#name");
    const nomeErro = document.querySelector("#name-error");

    if (nome.value.trim().length < 3) {
        nomeErro.textContent = "O nome deve ter pelo menos 3 caracteres.";
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector("#email");
    const emailErro = document.querySelector("#email-error");

    if (!emailRegex.test(email.value.trim())) {
        emailErro.textContent = "Digite um e-mail válido.";
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector("#subject");
    const assuntoErro = document.querySelector("#subject-error");

    if (assunto.value.trim().length < 5) {
        assuntoErro.textContent = "O assunto deve ter pelo menos 5 caracteres.";
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector("#message");
    const mensagemErro = document.querySelector("#message-error");

    if (mensagem.value.trim() === "") {
        mensagemErro.textContent = "A mensagem não pode ficar vazia.";
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const botao = formulario.querySelector("button");

        botao.disabled = true;
        botao.textContent = "Enviando...";

        formulario.submit();
    }
});

getAboutGithub();
getProjectsGithub();