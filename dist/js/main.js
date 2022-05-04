window.document.querySelector('.validator__submit').addEventListener('click', e => {
    e.preventDefault();
    const paragraph = document.querySelector('.validator__paragraph');
    function cpfValidator(sentCPF) {
        Object.defineProperty(this, 'cleanCPF', {
            enumerable: true,
            get: function() {
                return sentCPF.replace(/\D+/g, '');
            }
        });
    }
    
    cpfValidator.prototype.validate = function() {
        if(typeof this.cleanCPF === 'undefined') return false;
        if(this.cleanCPF.length !== 11) return false;
        if(this.isSequence()) return false;

        const PartialCPF = this.cleanCPF.slice(0, -2);
        const firstDigit = this.createDigit(PartialCPF);
        const secondDigit = this.createDigit(PartialCPF + firstDigit);
    
        const newCpf = PartialCPF + firstDigit + secondDigit;
        return newCpf === this.cleanCPF;
    };
    
    cpfValidator.prototype.createDigit = function(PartialCPF) {
        const arrayCpf = Array.from(PartialCPF);
    
        let regressive = arrayCpf.length + 1;
        const total = arrayCpf.reduce((ac, val) => {
        ac += (regressive * Number(val));
        regressive--;
        return ac;
        }, 0);
    
        const digit = 11 - (total % 11);
        return digit > 9 ? '0' : String(digit);
    };
    
    cpfValidator.prototype.isSequence = function() {
        const sequence = this.cleanCPF[0].repeat(this.cleanCPF.length);
        return sequence === this.cleanCPF;
    };

    const cpf = new cpfValidator(document.querySelector('#validator__input').value);
    
    if(cpf.validate()) {
        paragraph.classList.add('correct');
        paragraph.classList.remove('incorrect');
        paragraph.innerText = 'Your CPF is VALID!'
    } else {
        paragraph.classList.add('incorrect');
        paragraph.classList.remove('correct');
        paragraph.innerText = 'Your CPF is NOT valid!'
    }
})