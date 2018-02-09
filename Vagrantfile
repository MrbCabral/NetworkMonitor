# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.define "monitorserver" do |monitorserver|
    monitorserver.vm.hostname = "monitorserver"
    monitorserver.vm.box = "debian/stretch64"
    monitorserver.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network "forwarded_port", guest: 3306, host: 3306
    monitorserver.vm.network "private_network", ip: "192.168.0.2", virtualbox__intnet: "RedeVagrant"
    monitorserver.vm.synced_folder ".", "/var/www/html"
    monitorserver.vm.provider "virtualbox" do |vb|
      vb.name = "monitorserver"
    end
    monitorserver.vm.provision "shell", path: "./server-install.sh"
  end

end