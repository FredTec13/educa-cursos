// Função para cadastrar usuário
async function inserir_usuario() {
    const usuario = {
        nome: document.getElementById("registerName").value.trim(),
        email: document.getElementById("registerEmail").value.trim(),
        senha: document.getElementById("registerPassword").value.trim()
    };

    if (!usuario.nome || !usuario.email || !usuario.senha) {
        document.getElementById("registerMsg").innerText = "Preencha todos os campos!";
        return;
    }

    try {
        const response = await fetch("https://educa-cursos-production.up.railway.app/cadastrar", { // corrigido endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        const data = await response.json();
        document.getElementById("registerMsg").innerText = data.mensagem || "Cadastro realizado!";

        if (response.ok) {
            updateNavbarForLoggedUser(usuario.email);
            fecharModalCadastro();
            alert("Conta criada com sucesso!", "success");
        }
    } catch (error) {
        document.getElementById("registerMsg").innerText = "Erro no cadastro!";
        console.error("Erro:", error);
    }
}

// Função para login do usuário
async function buscar_usuario_por_email() {
    const emailInput = document.getElementById("login-email");
    const senhaInput = document.getElementById("login-password");
    const msgEl = document.getElementById("loginMsg");

    const usuario = {
        email: emailInput ? emailInput.value.trim() : "",
        senha: senhaInput ? senhaInput.value.trim() : ""
    };

    if (!usuario.email || !usuario.senha) {
        if (msgEl) msgEl.innerText = "Preencha todos os campos!";
        return;
    }

    try {
        const response = await fetch("https://educa-cursos-production.up.railway.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        const data = await response.json();

        if (msgEl) msgEl.innerText = data.mensagem || "Login realizado!";

        if (response.ok) {
            updateNavbarForLoggedUser(usuario.email);
            closeLoginModal();
            alert("Login realizado com sucesso!", "success");
        } else {
            alert(data.mensagem || "Credenciais inválidas!", "warning");
        }
    } catch (error) {
        if (msgEl) msgEl.innerText = "Erro no login!";
        console.error("Erro:", error);
    }
}

// Atualiza navbar para usuário logado
function updateNavbarForLoggedUser(email) {
    const navbarUser = document.getElementById("navbar-user");
    if (navbarUser) {
        navbarUser.innerText = `Olá, ${email}`;
    }

    const loginBtn = document.getElementById("btn-login");
    const registerBtn = document.getElementById("btn-register");
    const logoutBtn = document.getElementById("btn-logout");

    if (loginBtn) loginBtn.classList.add("hidden");
    if (registerBtn) registerBtn.classList.add("hidden");
    if (logoutBtn) logoutBtn.classList.remove("hidden");
}

// --------- Modais (Tailwind usando hidden) ---------

function openLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
}
function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

function abrirModalCadastro() {
    document.getElementById('registerModal').classList.remove('hidden');
}
function fecharModalCadastro() {
    document.getElementById('registerModal').classList.add('hidden');
}

function trocarParaCadastro() {
    closeLoginModal();
    abrirModalCadastro();
}
function trocarParaLogin() {
    fecharModalCadastro();
    openLoginModal();
}

// Fechar modais ao clicar fora
window.onclick = function (event) {
    const loginModal = document.getElementById('loginModal');
    const cadastroModal = document.getElementById('registerModal');

    if (event.target === loginModal) closeLoginModal();
    if (event.target === cadastroModal) fecharModalCadastro();
}

// --------- Menu Mobile ---------
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// --------- Carrossel ---------
function scrollCourses(direction) {
    const carousel = document.getElementById('courseCarousel');
    const scrollAmount = 320;
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// --------- Formulário de Contato ---------
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Obrigado por entrar em contato! Retornaremos em breve.');
    this.reset();
});
