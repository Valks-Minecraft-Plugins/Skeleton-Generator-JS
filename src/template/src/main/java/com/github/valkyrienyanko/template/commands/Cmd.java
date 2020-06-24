package com.github.valkyrienyanko.template.commands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public abstract class Cmd implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        run("", "", sender, cmd, args);
        return true;
    }

    public boolean run(String command, String permission, CommandSender sender, Command cmd, String[] args) {
        if (!cmd.getName().equalsIgnoreCase(command)) return false;
        if (!sender.hasPermission(permission)) {
            return false;
        }
        return true;
    }
}
