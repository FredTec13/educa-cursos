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
        const response = await fetch("https://educa-cursos-production.up.railway.app/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
 
        const data = await response.json();
        document.getElementById("registerMsg").innerText = data.mensagem || "Cadastro realizado!";
 
        if (response.ok) {
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            localStorage.setItem("usuarioEmail", usuario.email);
 
            updateNavbarForLoggedUser(usuario.email);
            fecharModalCadastro();
            alert("Conta criada com sucesso!");
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
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            localStorage.setItem("usuarioEmail", usuario.email);
 
            updateNavbarForLoggedUser(usuario.email);
            closeLoginModal();
           
            console.log("Login realizado - Dados salvos:", {
                email: usuario.email,
                token: data.token
            });
            debugLocalStorage();
           
            alert("Login realizado com sucesso!");
        } else {
            alert(data.mensagem || "Credenciais inválidas!");
        }
    } catch (error) {
        if (msgEl) msgEl.innerText = "Erro no login!";
        console.error("Erro:", error);
    }
}
 
// Função para restaurar sessão do usuário
function restoreUserSession() {
    const token = localStorage.getItem("token");
    const usuarioEmail = localStorage.getItem("usuarioEmail");
   
    console.log("Restaurando sessão:", { token, usuarioEmail });
   
    // Verifica se existe tanto token quanto email
    if (token && usuarioEmail) {
        updateNavbarForLoggedUser(usuarioEmail);
    } else {
        // Se não tem token ou email, faz logout para limpar dados inconsistentes
        clearInvalidSession();
    }
}
 
// Limpar sessão inválida
function clearInvalidSession() {
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("token");
   
    const navbarUser = document.getElementById("navbar-user");
    const loginBtn = document.getElementById("btn-login");
    const registerBtn = document.getElementById("btn-register");
    const logoutBtn = document.getElementById("btn-logout");
 
    if (navbarUser) {
        navbarUser.innerText = "";
        navbarUser.classList.add("hidden");
    }
    if (loginBtn) loginBtn.classList.remove("hidden");
    if (registerBtn) registerBtn.classList.remove("hidden");
    if (logoutBtn) logoutBtn.classList.add("hidden");
   
    console.log("Sessão inválida limpa");
}
 
// Atualiza navbar para usuário logado (CORRIGIDA)
function updateNavbarForLoggedUser(email) {
    // Usar setTimeout para garantir que o DOM está pronto
    setTimeout(() => {
        const navbarUser = document.getElementById("navbar-user");
        const loginBtn = document.getElementById("btn-login");
        const registerBtn = document.getElementById("btn-register");
        const logoutBtn = document.getElementById("btn-logout");
 
        console.log("Elementos encontrados:", {
            navbarUser: !!navbarUser,
            loginBtn: !!loginBtn,
            registerBtn: !!registerBtn,
            logoutBtn: !!logoutBtn
        });
 
        if (navbarUser) {
            // Pega apenas a parte antes do @ para exibir
            const nomeUsuario = email.split('@')[0];
            navbarUser.innerText = `Olá, ${nomeUsuario}`;
            navbarUser.classList.remove("hidden");
        }
 
        if (loginBtn) loginBtn.classList.add("hidden");
        if (registerBtn) registerBtn.classList.add("hidden");
        if (logoutBtn) logoutBtn.classList.remove("hidden");
       
        console.log("Sessão restaurada para:", email);
    }, 100);
}
 
// Função de logout (CORRIGIDA)
function logout() {
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("token");
 
    const navbarUser = document.getElementById("navbar-user");
    const loginBtn = document.getElementById("btn-login");
    const registerBtn = document.getElementById("btn-register");
    const logoutBtn = document.getElementById("btn-logout");
 
    if (navbarUser) {
        navbarUser.innerText = "";
        navbarUser.classList.add("hidden");
    }
    if (loginBtn) loginBtn.classList.remove("hidden");
    if (registerBtn) registerBtn.classList.remove("hidden");
    if (logoutBtn) logoutBtn.classList.add("hidden");
   
    console.log("Usuário deslogado");
    alert("Logout realizado com sucesso!");
}
 
// Debug do localStorage
function debugLocalStorage() {
    console.log("LocalStorage atual:", {
        usuarioEmail: localStorage.getItem("usuarioEmail"),
        token: localStorage.getItem("token")
    });
}
 
// --------- Modais ---------
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
 
// --------- Restaurar sessão ao carregar a página (CORRIGIDO) ---------
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado - verificando sessão...");
    restoreUserSession();
   
    // Debug inicial
    debugLocalStorage();
});
 
// Verificar autenticação em outras páginas (opcional)
function checkAuthentication() {
    const token = localStorage.getItem("token");
    const usuarioEmail = localStorage.getItem("usuarioEmail");
   
    if (!token || !usuarioEmail) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = 'index.html';
        return false;
    }
    return true;
}
 
 