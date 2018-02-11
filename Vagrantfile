# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.define "monitorserver" do |monitorserver|
    monitorserver.vm.hostname = "monitorserver"
    monitorserver.vm.box = "ubuntu/xenial64"
    monitorserver.vm.box_version = "20180126.0.0"
    monitorserver.vm.network "forwarded_port", guest: 80, host: 80
    monitorserver.vm.network "forwarded_port", guest: 3306, host: 3306
    # monitorserver.vm.network "private_network", ip: "192.168.0.2", virtualbox__intnet: "RedeVagrant"
    ## A linha seguinte configura uma rede bridge Ethernet
    # monitorserver.vm.network "public_network", :bridge => 'Realtek PCIe Family Controller'
    ## A linha seguinte configura uma rede bridge WiFi
    monitorserver.vm.network "public_network", :bridge => 'Dell Wireless 1705 802.11b/g/n (2.4GHZ)'
    monitorserver.vm.synced_folder ".", "/var/www/html"
    monitorserver.vm.provider "virtualbox" do |vb|
      vb.name = "monitorserver"
    end
    monitorserver.vm.provision "shell", inline: <<-SHELL
    sudo su
    useradd monitor
    passwd -d -u monitor
    chage -d0 monitor
    echo "monitor:monitor" | sudo chpasswd
    cd
    pwd
    echo -e "root\nroot" | passwd root
    sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config
    cp -rvf /home/vagrant/.ssh/ /root/
    true
    SHELL
    monitorserver.vm.provision "shell", path: "./server-install.sh"

  end

end