package org.thesaltynewfie.connector.client;

import org.spongepowered.asm.mixin.Mixin;
import net.minecraft.client
import org.spongepowered.asm.mixin.injection.Inject;

@Mixin(InGameHud.class)
public class InGameHudMixin {

    @Inject(method = "render", at = @At("RETURN"), cancellable = true)

    public void onRender (MatrixStack matrices, float tickDelta, CallbackInfo info) {

        MinecraftClient.getInstance().textRenderer.draw(matrices, "Text", 5, 5, -1);

    }

}