const API = "http://localhost:3000/api";

// ---------------------------
//   OPERACOES DE CONTAS
// ---------------------------

async function createAccount() {
    try {
        const data = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value
        };

        const response = await fetch(`${API}/accounts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        document.getElementById("create-account-result").textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("create-account-result").textContent = `Erro: ${error.message}`;
    }
}

async function listAccounts() {
    try {
        const response = await fetch(`${API}/accounts`);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        document.getElementById("list-accounts-result").textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("list-accounts-result").textContent = `Erro: ${error.message}`;
    }
}

async function getAccount() {
    try {
        const id = document.getElementById("get-id").value;
        
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const response = await fetch(`${API}/accounts/${id}`);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        document.getElementById("get-account-result").textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("get-account-result").textContent = `Erro: ${error.message}`;
    }
}

async function deposit() {
    try {
        const id = document.getElementById("deposit-id").value;
        const amount = Number(document.getElementById("deposit-amount").value);

        if (!id || !amount || amount <= 0) {
            throw new Error("ID e valor válido são obrigatórios");
        }

        const response = await fetch(`${API}/accounts/${id}/deposit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount })
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        document.getElementById("deposit-result").textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("deposit-result").textContent = `Erro: ${error.message}`;
    }
}

// ---------------------------
//        SOAP (via GATEWAY)
// ---------------------------

async function uploadFile() {
    try {
        const fileInput = document.getElementById("file-upload");
        const file = fileInput.files[0];

        if (!file) {
            alert("Selecione um arquivo!");
            return;
        }

        const contentBase64 = await fileToBase64(file);

        const response = await fetch(`${API}/files`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filename: file.name,
                contentBase64
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        document.getElementById("upload-file-result").textContent =
            JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("upload-file-result").textContent = `Erro: ${error.message}`;
    }
}

async function getFileInfo() {
    try {
        const id = document.getElementById("file-id").value;
        
        if (!id) {
            throw new Error("ID do arquivo é obrigatório");
        }

        const response = await fetch(`${API}/files/${id}`);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        document.getElementById("file-info-result").textContent =
            JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById("file-info-result").textContent = `Erro: ${error.message}`;
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}